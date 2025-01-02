"use client";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { useData } from "@/contexts/useDataContext";
import { FaFacebook, FaInstagram, FaPhone, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa6";

export function Footer() {
    const { config } = useData()
    const links = config?.links || []

    const FTitle = ({ children }: { children: React.ReactNode }) => (
        <h3 className="!text-black text-lg mb-4">
            {children}
        </h3>
    );

    const socialLinks: { href: string; icon: JSX.Element }[] = [
        { href: config?.instagram || "#", icon: <FaInstagram size={25} /> },
        { href: config?.facebook || "#", icon: <FaFacebook size={25} /> },
        { href: config?.twitter || "#", icon: <FaTwitter size={25} /> },
        { href: config?.youtube || "#", icon: <FaYoutube size={25} /> },
        { href: config?.whatsAppApi || "#", icon: <FaWhatsapp size={25} /> },
    ];

    return (
        <footer className="relative w-full flex flex-col items-center gap-10 bg-gray-100 text-gray-700 px-20 py-20 mt-14">
            <main className="flex flex-wrap justify-center text-center md:text-start gap-8 md:gap-16">
                <section>
                    <FTitle>Links</FTitle>
                    <div>
                        <ul>
                            {links.map((item: any, index: any) => (
                                <li key={index} className="hover:text-corTema">
                                    <Link href={item.url}>{item.titulo}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section>
                    <FTitle>Redes sociais</FTitle>
                    <div>
                        <ul className="flex gap-2">
                            {socialLinks.map((link, index) => (
                                <li key={index} className="hover:text-corTema">
                                    <Link href={link.href}>{link.icon}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section>
                    <FTitle>Contato</FTitle>
                    <section>
                        {config?.telefones && config?.telefones.map((telefone: any, index: any) => (
                            telefone.contato && (
                                <div key={index} className="hover:text-corTema">
                                    <h4 className="flex gap-2">
                                        <FaPhone size={25} />
                                        {telefone.contato}
                                    </h4>
                                    <p className="text-sm text-gray-500">{telefone.descricao}</p>
                                </div>
                            )
                        ))}
                    </section>
                </section>

                <section className="hover:text-corTema">
                    <FTitle>Pagamento</FTitle>
                    <div className="w-[220px] h-auto">
                        {config?.imagemCartaoCredito && <Image
                            src={config?.imagemCartaoCredito}
                            className="w-full h-full rounded-md object-cover"
                            width={220} height={40}
                            priority
                            quality={100}
                            alt="Pagamento"
                        />}
                    </div>
                </section>

                <section>
                    <FTitle>Segurança</FTitle>
                    <div className="w-[150px] h-auto">
                        {config?.imagemSegurancaSite && <Image
                            src={config?.imagemSegurancaSite}
                            className="w-full h-auto rounded-md object-cover"
                            width={240} height={70}
                            priority
                            quality={100}
                            alt="Seguranca do site"
                        />}
                    </div>
                </section>
            </main>

            <section className="text-center">
                <div
                    dangerouslySetInnerHTML={{
                        __html: (config?.rodape2_conteudo || "<p>Conteúdo indisponível</p>").replace(
                            /style="[^"]*"/g,
                            '' // Remove estilos inline
                        )
                    }}
                />

                <div>
                    <p>&copy; {new Date().getFullYear()} - {config?.tituloSite}</p>
                </div>
            </section>
        </footer>
    );
}


