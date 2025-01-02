import "./globals.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Providers } from "./providers";
import { apiTindo } from "@/services/apiTindo";

export async function generateMetadata() {
  try {
    const response = await apiTindo.get("/configuracao");
    const data = response.data;

    return {
      title: data.tituloSite + " | " + data.descricaoSite || "Loja Tindo E-commerce",
      description: data.descricaoSite || "Generated by create next app",
    };
  } catch (error) {
    console.error("Erro ao buscar metadados:", error);

    return {
      title: "Loja Tindo E-commerce",
      description: "Generated by create next app",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className="antialiased"
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
