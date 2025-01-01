import { useData } from "@/contexts/useDataContext";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export function Galeria() {

    const { galeria } = useData();

    return (
        <section className="flex flex-wrap w-full justify-center px-4 md:px-12 gap-4">
            {galeria.map((item: any) => (
                <section key={item.id} className="w-full sm:w-[450px] border border-gray-200 rounded-lg">
                    <div className="relative flex w-full justify-center h-[250px]">
                        {item.alerta && <span className="absolute w-[90%] text-center bottom-4 bg-yellow-700 py-1 rounded-md">
                            {item.alerta}
                        </span>}
                        <Image
                            src={item.imagemCapa}
                            className="w-full h-full object-cover rounded-t-lg"
                            priority
                            width={450} height={250}
                            alt="Galeria"
                            quality={100}
                        />
                    </div>

                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-corHeader">{item.titulo}</h2>
                        <h3 className="truncate">{item.subTitulo}</h3>
                        <p>{item.duracaoServico}</p>

                        <div className="flex mt-4 items-center justify-between">
                            <div>
                                {item.valorFinal && <label className="text-gray-500 text-sm">
                                    {item.labelValorGaleria}
                                </label>}
                                <h4 className="text-2xl font-bold">{item.valorFinal}</h4>
                            </div>

                            <Link href={`/visualizar/${item.tipo.toLowerCase()}/${item.id}`}>
                                <Button radius="sm" className="font-semibold uppercase" color="primary">
                                    {item.botaoGaleria}
                                </Button>
                            </Link>
                        </div>
                    </div>

                </section>
            ))}
        </section>
    );
}