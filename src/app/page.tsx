"use client";
import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { apiTindo } from "@/services/apiTindo";
import { FloatButton } from "./components/layout/floatButton";
import Image from "next/image";
import { Carousel } from "@material-tailwind/react";
import { Galeria } from "./components/galeria";
import { Footer } from "./components/footer";
import { Container } from "./components/layout/container";


export default function Home() {

  const [linkFloatButton, setLinkFloatButton] = useState<string>("")
  const [sliders, setSliders] = useState<any[]>([])
  const [footerCards, setFooterCards] = useState<any[]>([])

  useEffect(() => {
    apiTindo.get("/configuracao").then((response) => {

      const sliderImages = Object.keys(response.data)
        .filter((key) => key.startsWith("slider") && key.endsWith("_imagem"))
        .map((key) => response.data[key]);

      const footerCardsImages = Object.keys(response.data)
        .filter((key) => key.startsWith("selo") && key.endsWith("_imagem"))
        .map((key) => response.data[key]);

      setLinkFloatButton(response.data.whatsAppApi);
      setSliders(sliderImages);
      setFooterCards(footerCardsImages);
    });

  }, []);

  return (
    <>
      <Header />
      <FloatButton link={linkFloatButton} redeSocial="whatsapp" />

      <Container>
        <section className="w-full flex justify-center px-6">
          <Carousel className="w-full max-w-[1000px] rounded-lg">
            {sliders
              .filter((image) => image && typeof image === "string" && image.trim() !== "")
              .map((image, index) => (
                <div key={index} className="flex justify-center items-center">
                  <Image
                    src={image}
                    className="w-auto h-auto"
                    alt="slider"
                    width={1000}
                    height={300}
                    onError={(e) => {
                      console.error("Invalid URL:", image);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
          </Carousel>
        </section>

        <section className="w-full my-16">
          <Galeria />
        </section>

        <section className="w-full my-16">
          <div className="flex flex-row flex-wrap w-full justify-center gap-8 sm:gap-12">
            {footerCards.filter(item => item !== "" && item !== null).map((item, index) => (
              <Image
                src={item}
                key={index}
                width={250} height={150}
                priority
                quality={100}
                alt="FooterCard"
              />
            ))}
          </div>
        </section>
      </Container>

      <Footer />

    </>
  );
}
