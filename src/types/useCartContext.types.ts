export type CartItem = {
    id: string;
    titulo: string;
    pessoas: {
        adulto: number,
        crianca: number,
        bebe: number,
        idoso: number,
    };
    dataPasseio: any;
    horarioEmbarque: string;
    localEmbarque: string;
    valor: number;
    imagemCapa: string;
};

export type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};
