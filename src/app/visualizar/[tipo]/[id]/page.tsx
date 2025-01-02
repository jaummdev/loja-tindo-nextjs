"use client";

import Image from "next/image";
import { Container } from "@/app/components/layout/container";
import { useData } from "@/contexts/useDataContext";
import { Button, DatePicker, DateValue, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { FaClock, FaLocationDot, FaRegClock, FaRegLightbulb, FaUsers } from "react-icons/fa6";
import { VLabel, VSection, VSpan } from "@/app/components/layout/visualizar";
import { TiWarningOutline } from "react-icons/ti";
import { Carousel } from "@material-tailwind/react";
import { QuantidadeProps } from "@/types/visualizar.types";
import { useCart } from "@/contexts/useCartContext";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function VisualizarDinamico() {
    const router = useRouter();
    const { dynamicData, loading, error } = useData();
    const { addToCart } = useCart();
    const [invalidImages, setInvalidImages] = useState<Set<number>>(new Set());
    const [dataPasseio, setDataPasseio] = useState<DateValue | null>(null);
    const [localEmbarque, setLocalEmbarque] = useState<string>("");
    const [horarioEmbarque, setHorarioEmbarque] = useState<string>("");
    const [quantidades, setQuantidades] = useState<QuantidadeProps>({
        adulto: 0,
        crianca: 0,
        bebe: 0,
        idoso: 0,
    });

    const horarios: { label: string; key: string; }[] = [
        { label: "08:00", key: "08:00" },
        { label: "09:00", key: "09:00" },
        { label: "10:00", key: "10:00" },
    ];

    const tipos: { label: string; value: number; type: keyof QuantidadeProps }[] = [
        { label: "Adulto", value: quantidades.adulto, type: "adulto" },
        { label: "Criança", value: quantidades.crianca, type: "crianca" },
        { label: "Bebê", value: quantidades.bebe, type: "bebe" },
        { label: "Idoso", value: quantidades.idoso, type: "idoso" },
    ];

    const handleImageError = (index: number) => {
        setInvalidImages((prev) => new Set(prev).add(index));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof QuantidadeProps) => {
        setQuantidades({
            ...quantidades,
            [type]: parseInt(e.target.value) || 0,
        });
    };

    const handleDateChange = (value: DateValue | null) => {
        setDataPasseio(value);
    };

    const handleChangeHorarios = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHorarioEmbarque(e.target.value);
    };

    const handleChangeLocais = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalEmbarque(e.target.value);
    };

    if (loading) {
        return (
            <Container className="flex justify-center">
                Carregando...
            </Container>
        );
    }

    if (error) {
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

    const handleAddToCart = () => {
        const totalPessoas =
            quantidades.adulto + quantidades.crianca + quantidades.bebe + quantidades.idoso;
        if (totalPessoas === 0) {
            alert("Adicione pelo menos uma pessoa ao carrinho.");
            return;
        }

        const formattedDate = dataPasseio ? format(new Date(dataPasseio), "dd/MM/yyyy") : "";

        addToCart({
            id: dynamicData?.id || "produto-sem-id",
            titulo: dynamicData?.nome || "",
            pessoas: {
                adulto: quantidades.adulto,
                crianca: quantidades.crianca,
                bebe: quantidades.bebe,
                idoso: quantidades.idoso,
            },
            dataPasseio: formattedDate,
            horarioEmbarque: horarioEmbarque,
            localEmbarque: localEmbarque,
            imagemCapa: dynamicData?.imagemCapa || "",
            valor: dynamicData?.valorDestaque || 0,
        });

        // Navega para a página do carrinho
        router.push("/carrinho");
    };

    return (
        <Container className="flex justify-center px-8">
            <section className="flex flex-col md:flex-row justify-center gap-4 bg-gray-200 px-6 py-4 rounded-md">
                <section className="flex flex-col gap-4 max-w-[700px]">
                    <Carousel autoplay={true} loop={true} className="w-full max-w-[800px] max-h-[400px] rounded-lg">
                        {sliderImages.map((image, index) => {
                            if (invalidImages.has(index)) return null;

                            return (
                                <Image
                                    src={image}
                                    key={index}
                                    className="w-full h-full object-cover rounded-lg"
                                    alt={`slider-${index}`}
                                    width={800}
                                    height={400}
                                    quality={100}
                                    onError={() => handleImageError(index)}
                                />
                            );
                        })}
                    </Carousel>

                    {dynamicData?.descricaoSite ? (
                        <div dangerouslySetInnerHTML={{ __html: dynamicData?.descricaoSite }}></div>
                    ) : (
                        <div className="text-center text-red-700">Descrição não disponível...</div>
                    )}
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
                        {dynamicData?.duracaoServico && (
                            <VSpan>
                                <FaRegClock size={15} />
                                {dynamicData?.duracaoServico}
                            </VSpan>
                        )}

                        {dynamicData?.alerta && (
                            <VSpan>
                                <FaRegLightbulb size={15} />
                                {dynamicData?.alerta}
                            </VSpan>
                        )}
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
                                            value={value.toString()}
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
                                    value={dataPasseio}
                                    onChange={handleDateChange}
                                />
                            </div>

                            <div className="flex flex-wrap sm:flex-nowrap justify-between my-4 gap-4">
                                <div className="w-full">
                                    <VLabel>
                                        <FaClock size={15} />
                                        Escolha um horário
                                    </VLabel>

                                    <Select
                                        label="Selecione um horário"
                                        selectedKeys={[horarioEmbarque]}
                                        onChange={handleChangeHorarios}
                                        radius="sm"
                                    >
                                        {horarios.map((horario) => (
                                            <SelectItem key={horario.key}>
                                                {horario.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="w-full">
                                    <VLabel>
                                        <FaLocationDot size={15} />
                                        Escolha um local
                                    </VLabel>

                                    <Select
                                        label="Selecione um local"
                                        selectedKeys={[localEmbarque]}
                                        onChange={handleChangeLocais}
                                        radius="sm"
                                    >
                                        {dynamicData?.locaisEmbarque ? (
                                            dynamicData?.locaisEmbarque.map((local: any) => (
                                                <SelectItem key={local.nome}>
                                                    {local.nome}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            dynamicData?.localPadraoEmbarque && (
                                                <SelectItem key={dynamicData?.localPadraoEmbarque}>
                                                    {dynamicData?.localPadraoEmbarque}
                                                </SelectItem>
                                            )
                                        )}
                                    </Select>
                                </div>
                            </div>

                            <Divider />

                            <section className="flex w-full my-6 justify-between">
                                <span>TOTAL:</span>
                                <h2 className="font-semibold text-2xl text-corTema">
                                    {dynamicData?.valorDestaque}
                                </h2>
                            </section>

                            <Divider />

                            <Button
                                color="secondary"
                                onPress={handleAddToCart}
                                radius="sm"
                                className="uppercase font-semibold my-4"
                                fullWidth
                            >
                                Adicionar ao carrinho
                            </Button>
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