"use client";
import Image from "next/image";
import Link from "next/link";
import { apiTindo } from "@/services/apiTindo";
import { MenuItemsProps } from "@/types/header.types";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

export function Header() {

    const [logoCabecalho, setLogoCabecalho] = useState<string>("");
    const [menuItems, setMenuItems] = useState<MenuItemsProps[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        apiTindo.get("/configuracao").then((response) => {
            setLogoCabecalho(response.data.logoCabecalho);
            setMenuItems(response.data.menu);
        })

    }, []);

    return (
        <Navbar
            isBlurred={false}
            maxWidth="full"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            disableScrollHandler
            classNames={{
                wrapper: "flex sm:flex-col py-14 gap-8 mb-14 text-white bg-corHeader h-[150px] sm:h-auto",
                menu: "z-50 mt-20 items-center gap-4",
                menuItem: "hover:text-white hover:bg-corTema hover:cursor-pointer px-4 py-2 rounded-md first-letter:uppercase transition-colors",
            }}
            style={{ height: "auto" }}
            position="static"
        >

            <NavbarContent justify="center" className="sm:hidden h-fit">
                <NavbarMenuToggle className="p-6" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent justify="center">
                <NavbarBrand>
                    {logoCabecalho && (
                        <Link href="/">
                            <Image
                                src={logoCabecalho}
                                className="w-full max-w-[180px] h-auto"
                                width={150} height={50}
                                priority
                                alt="Logo"
                            />
                        </Link>
                    )}
                </NavbarBrand>
            </NavbarContent>


            <NavbarContent justify="center" className="hidden sm:flex flex-wrap gap-2">
                {menuItems.map((item) => (
                    <NavbarItem key={item.id} className="w-fit first-letter:uppercase hover:bg-corTema px-4 py-2 text-center rounded-md transition-colors">
                        <Link href={item.tipo == "LINK" ? item.url : "#"}>
                            {item.nome}
                        </Link>
                    </NavbarItem>
                ))}
                <div>
                    <Link href="/carrinho">
                        <Button color="primary" isIconOnly radius="sm">
                            <FaCartShopping size={22} />
                        </Button>
                    </Link>
                </div>
            </NavbarContent>

            {/* Mobile */}

            <NavbarMenu>
                {menuItems.map((item) => (
                    <NavbarMenuItem key={item.id}>
                        <Link href={item.tipo == "LINK" ? item.url : "#"}>
                            {item.nome}
                        </Link>
                    </NavbarMenuItem>
                ))}

                <NavbarMenuItem className="p-4">
                    <Link href="/carrinho">
                        <FaCartShopping size={22} />
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}


