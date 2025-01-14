import { cn } from "@/utils/tailwindMarge"

export function Container({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <section className={cn(className + " flex flex-col items-center w-full min-h-[calc(100vh-550px)]")}>
            {children}
        </section>
    );
}