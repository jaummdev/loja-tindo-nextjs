"use client";
import Image from "next/image";
import { Container } from "@/app/components/layout/container";
import { useData } from "@/contexts/useDataContext";
import { Button, DatePicker, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { FaClock, FaLocationDot, FaRegClock, FaRegLightbulb, FaUsers } from "react-icons/fa6";
import { VLabel, VSection, VSpan } from "@/app/components/layout/visualizar";
import { TiWarningOutline } from "react-icons/ti";
import Link from "next/link";
import { Carousel } from "@material-tailwind/react";

export default function VisualizarDinamico() {
    const { dynamicData, loading, error } = useData();
    const [quantidades, setQuantidades] = useState({
        adulto: 0,
        crianca: 0,
        bebe: 0,
        idoso: 0,
    });

    const horarios = [
        { label: "08:00", value: "08:00" },
        { label: "09:00", value: "09:00" },
        { label: "10:00", value: "10:00" },
    ]

    const tipos = [
        { label: "Adulto", value: quantidades.adulto, type: "adulto" },
        { label: "Criança", value: quantidades.crianca, type: "crianca" },
        { label: "Bebê", value: quantidades.bebe, type: "bebe" },
        { label: "Idoso", value: quantidades.idoso, type: "idoso" },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        setQuantidades({
            ...quantidades,
            [type]: parseInt(e.target.value) || 0,
        });
    };

    if (loading){
        return (
            <Container className="flex justify-center">
                Carregando...
            </Container>
        );
    }

    if (error){
        return (
            <Container className="flex justify-center">
                Erro: {error}
            </Container>
        );
    }

    const sliderImages = dynamicData
        ? Object.keys(dynamicData)
            .filter((key) => key.startsWith("imagem"))
            .map((key) => dynamicData[key])
            .filter((image) => image && typeof image === "string" && image.trim() !== "")
        : [];

    return (
        <Container className="flex justify-center px-8">
            <section className="flex flex-col md:flex-row justify-center gap-4 bg-gray-200 px-6 py-4 rounded-md">
                <section className="flex flex-col gap-4 max-w-[700px]">
                    <Carousel className="w-full max-w-[800px] max-h-[400px] rounded-lg">
                        {sliderImages.map((image, index) => (
                            <Image
                                src={image}
                                key={index}
                                className="w-full h-full object-cover rounded-lg"
                                alt={`slider-${index}`}
                                width={800}
                                height={400}
                                quality={100}
                                onError={(e) => {
                                    console.error("Invalid URL:", image);
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ))}
                    </Carousel>

                    <div dangerouslySetInnerHTML={{ __html: dynamicData?.descricaoSite }}></div>
                </section>

                <section className="flex flex-col gap-2">
                    <VSection>
                        <div>
                            <span>{dynamicData?.labelValorDestaque}</span>
                            <h1 className="flex flex-col text-corTema font-bold text-3xl">
                                {dynamicData?.valorDestaque}
                            </h1>
                        </div>
                    </VSection>

                    <VSection>
                        {dynamicData?.duracaoServico && <VSpan>
                            <FaRegClock size={15} />
                            {dynamicData?.duracaoServico}
                        </VSpan>}

                        {dynamicData?.alerta && <VSpan>
                            <FaRegLightbulb size={15} />
                            {dynamicData?.alerta}
                        </VSpan>}
                    </VSection>

                    {dynamicData?.hasDisponibilidade ? (
                        <VSection>
                            <div className="mb-4">
                                <VLabel>
                                    <FaUsers size={15} />
                                    Quantas pessoas ?
                                </VLabel>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {tipos.map(({ label, value, type }) => (
                                        <Input
                                            key={type}
                                            type="number"
                                            label={label}
                                            value={quantidades[type] || 0}
                                            className="max-w-[100px]"
                                            radius="sm"
                                            onChange={(e) => handleInputChange(e, type)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="my-4">
                                <label>Escolha a data do passeio/transfer</label>
                                <DatePicker
                                    label="Escolha a data"
                                    radius="sm"
                                />
                            </div>

                            <div className="flex flex-wrap sm:flex-nowrap justify-between my-4 gap-4">
                                <div className="w-full">
                                    <VLabel>
                                        <FaClock size={15} />
                                        Escolha um horário
                                    </VLabel>

                                    <Select label="Selecione um horário" radius="sm">
                                        {horarios.map((item: any, index: any) => (
                                            <SelectItem key={index} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="w-full">
                                    <VLabel>
                                        <FaLocationDot size={15} />
                                        Escolha um local
                                    </VLabel>

                                    <Select label="Selecione um local" radius="sm">
                                        {dynamicData?.locaisEmbarque.map((item: any) => (
                                            <SelectItem key={item.id} value={item.nome}>
                                                {item.nome}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <Divider />

                            <section className="flex w-full my-6 justify-between">
                                <span>TOTAL:</span>
                                <h2 className="font-semibold text-2xl text-corTema">{dynamicData?.valorDestaque}</h2>
                            </section>

                            <Divider />

                            <Link href="/carrinho">
                                <Button color="secondary"
                                    radius="sm"
                                    className="uppercase font-semibold my-4"
                                    fullWidth>
                                    Adicionar ao carrinho
                                </Button>
                            </Link>

                        </VSection>
                    ) : (
                        <VSection>
                            <div className="text-red-500">
                                <VLabel>
                                    <TiWarningOutline size={20} />
                                    Sem disponibilidade...
                                </VLabel>
                            </div>
                        </VSection>
                    )}
                </section>
            </section>
        </Container>
    );
}

