export function Container({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full min-h-[calc(100vh-550px)]">
            {children}
        </section>
    );
}