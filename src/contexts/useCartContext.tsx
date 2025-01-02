"use client";

import { CartContextType, CartItem } from "@/types/useCartContext.types";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        const sanitizedItem = {
            ...item,
            localEmbarque: item.localEmbarque || "",
            horarioEmbarque: item.horarioEmbarque || "",
        };

        const cleanValue = sanitizedItem.valor
            ? parseFloat(
                String(sanitizedItem.valor)
                    .replace(/[^\d,.-]/g, '')
                    .replace(",", ".")
            )
            : 0;

        const newItem = {
            ...sanitizedItem,
            valor: cleanValue,
        };

        setCart((prev) => [...prev, newItem]);
        localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    useEffect(() => {
        const loadCartFromLocalStorage = () => {
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);

                const cleanedCart = parsedCart.map((item: CartItem | any) => {
                    const valor = typeof item?.valor === "string"
                        ? parseFloat(item?.valor.replace(/[^\d,.-]/g, '').replace(",", "."))
                        : item?.valor;

                    return {
                        ...item,
                        valor: valor || 0,
                    };
                });

                setCart(cleanedCart);
            }
        };

        loadCartFromLocalStorage();
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
