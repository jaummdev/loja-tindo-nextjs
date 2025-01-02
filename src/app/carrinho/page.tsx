"use client";

import Image from "next/image";
import { useCart } from "@/contexts/useCartContext";
import { Button, Divider } from "@nextui-org/react";
import { Container } from "../components/layout/container";
import { CHeader, CItemInfo, CResumo, CResumoLabel, CSection } from "../components/layout/carrinho";
import { FaTrashAlt } from "react-icons/fa";
import { FaCalendarDays, FaLocationDot, FaRegClock, FaUsers } from "react-icons/fa6";

export default function Carrinho() {
    const { cart, removeFromCart, clearCart } = useCart();

    const totalValor = cart.reduce((acc, item) => acc + (Number(item.valor) || 0), 0);

    return (
        <Container>
            {cart.length === 0 ? (
                <section className="flex min-w-[95%] md:min-w-[70%] p-4  gap-3 rounded-md bg-gray-100">
                    <CHeader clearCart={clearCart}>
                        <div className="w-full min-h-[200px] flex justify-center">
                            <p>Seu carrinho está vazio.</p>
                        </div>
                    </CHeader>
                </section>
            ) : (
                <CSection>
                    <CHeader clearCart={clearCart}>
                        <div className="w-full flex flex-col gap-2">
                            {cart.map((item, index) => (
                                <div key={index} className="flex flex-wrap justify-between py-2 px-4 even:bg-gray-300 border border-gray-300 rounded-md">
                                    <section className="flex gap-6">
                                        <div className="w-[80px] h-[60px]">
                                            <Image
                                                src={item.imagemCapa}
                                                width={200} height={200}
                                                className="w-full h-full object-cover rounded-md"
                                                alt="Capa item"
                                            />
                                        </div>

                                        <div>
                                            <h2 className="font-bold text-md md:text-lg">{item.titulo}</h2>
                                            <CItemInfo>
                                                <FaUsers size={15} />
                                                {(Object.values(item.pessoas) as number[]).filter((value) => value > 0).map((value, index) => (
                                                    <p key={index} className="first-letter:uppercase odd:text-gray-700">{Object.keys(item.pessoas)[index]}(s): {value}</p>
                                                ))}
                                            </CItemInfo>

                                            <CItemInfo>
                                                <FaRegClock size={15} />
                                                <p>{item.horarioEmbarque}</p>
                                            </CItemInfo>

                                            <CItemInfo>
                                                <FaLocationDot size={15} />
                                                <p>{item.localEmbarque}</p>
                                            </CItemInfo>

                                            <CItemInfo>
                                                <FaCalendarDays size={15} />
                                                <p>{item.dataPasseio}</p>
                                            </CItemInfo>
                                        </div>
                                    </section>

                                    <div className="flex w-full lg:w-fit justify-between items-center gap-4">
                                        <strong className="text-gray-800 text-lg">R$ {item.valor.toFixed(2).toString().split(".").join(",")}</strong>
                                        <Button
                                            radius="sm"
                                            color="danger"
                                            isIconOnly
                                            onPress={() => removeFromCart(item.id)}>

                                            <FaTrashAlt size={18} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CHeader>

                    <CResumo>
                        <div className="flex flex-col px-4 text-lg text-corHeader">
                            <CResumoLabel>
                                Quantidade de itens <span>{cart.length}</span>
                            </CResumoLabel>

                            <Divider />

                            <CResumoLabel>
                                Total <strong>R$ {totalValor.toFixed(2).toString().split(".").join(",")}</strong>
                            </CResumoLabel>

                            <Divider />

                            <Button onPress={() => alert("Compra efetuada com sucesso !")} className="text-white uppercase font-semibold my-4" radius="sm" color="success">
                                Finalizar compra
                            </Button>
                        </div>
                    </CResumo>
                </CSection>
            )}
        </Container>
    );
}
