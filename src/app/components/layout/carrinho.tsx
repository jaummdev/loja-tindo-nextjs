import { Button } from "@nextui-org/react";

export const CSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="flex flex-wrap md:flex-nowrap justify-center md:justify-between bg-gray-100 rounded-md min-w-[80%] p-4 mx-8 gap-3">
            {children}
        </section>
    );
}

export const CHeader = ({ children, clearCart }: { children: React.ReactNode, clearCart: () => void }) => {
    return (
        <section className="flex flex-col w-full gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-between bg-gray-300 px-4 py-2 gap-4 rounded-md">
                <h1 className="text-xl font-bold text-center">Produtos no seu carrinho</h1>
                <Button onPress={clearCart} className="uppercase font-semibold" radius="sm" color="primary">Esvaziar carrinho</Button>
            </div>
            {children}
        </section>
    );
}

export const CResumo = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="bg-white w-full h-fit max-w-[350px] rounded-md">
            <div className="flex items-center justify-center p-4 w-full bg-black text-white rounded-md ">
                <h2 className="font-bold text-xl">Resumo</h2>
            </div>

            <div>
                {children}
            </div>
        </section>
    );
}
export const CResumoLabel = ({ children }: { children: React.ReactNode }) => {
    return <label className="w-full flex justify-between py-4">{children}</label>
}

export const CItemInfo = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-wrap items-center gap-2">{children}</div>
}