"use client";

import Image from "next/image";
import { FloatButton } from "./components/layout/floatButton";
import { Carousel } from "@material-tailwind/react";
import { Galeria } from "./components/galeria";
import { Container } from "./components/layout/container";
import { useData } from "@/contexts/useDataContext";

export default function Home() {
  const { config, loading, error } = useData();

  if (loading) return (
    <Container>
      Carregando...
    </Container>
  );
  if (error) return <Container>Erro: {error}</Container>;

  // Filtrando as imagens do slider
  const sliderImages = config
    ? Object.keys(config)
      .filter((key) => key.startsWith("slider") && key.endsWith("_imagem"))
      .map((key) => config[key])
      .filter((image) => image && typeof image === "string" && image.trim() !== "")
    : [];

  // Filtrando as imagens dos selos do footer
  const footerCardsImages = config
    ? Object.keys(config)
      .filter((key) => key.startsWith("selo") && key.endsWith("_imagem"))
      .map((key) => config[key])
      .filter((image) => image && typeof image === "string" && image.trim() !== "")
    : [];

  return (
    <>
      <FloatButton link={config?.whatsAppApi} redeSocial="whatsapp" />
      <Container>
        {/* Seção do Slider */}
        <section className="w-full flex justify-center px-6">
          <Carousel className="w-full max-w-[1000px] rounded-lg"
            placeholder="Slider Images"
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
          >
            {sliderImages.map((image, index) => (
              <div key={index} className="flex justify-center items-center">
                <Image
                  src={image}
                  className="w-auto h-auto"
                  alt={`slider-${index}`}
                  width={1000}
                  height={300}
                  onError={(e) => {
                    console.error("Invalid URL:", image);
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ))}
          </Carousel>
        </section>

        {/* Seção da Galeria */}
        <section className="w-full my-16">
          <Galeria />
        </section>

        {/* Seção dos Selos */}
        <section className="w-full">
          <div className="flex flex-row flex-wrap w-full justify-center gap-8 sm:gap-12">
            {footerCardsImages.map((item, index) => (
              <Image
                src={item}
                key={index}
                width={250}
                height={150}
                priority
                quality={100}
                alt={`FooterCard-${index}`}
              />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
