"use client"

import { CartProvider } from '@/contexts/useCartContext'
import { DataProvider } from '@/contexts/useDataContext'
import { ThemeProvider } from '@material-tailwind/react'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <DataProvider>
            <CartProvider>
                <ThemeProvider>
                    <NextUIProvider>
                        {children}
                    </NextUIProvider>
                </ThemeProvider>
            </CartProvider>
        </DataProvider>
    )
}