export function VSpan({ children }: { children: React.ReactNode }) {
    return (
        <span className="flex gap-2 items-center text-corHeader">
            {children}
        </span>
    );
}

export function VSection({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-white w-full rounded-md py-2 px-6">
            {children}
        </section>
    );
}

export function VLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="flex my-1 gap-2 items-center">
            {children}
        </label>
    );
}