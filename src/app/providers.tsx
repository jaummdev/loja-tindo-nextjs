'use client'

import { ThemeProvider } from '@material-tailwind/react'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ThemeProvider>
    )
}