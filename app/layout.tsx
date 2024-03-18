import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
/* import Providers from "./utils/models/providers"; */

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Balcon App",
  description: "Pagina oficial de El Balcon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return  (
    <html lang="en">
      <body className={inter.className}>   
        {/* <Providers> */}
          {children}
        {/* </Providers> */}
      </body>
    </html>
  ); 
}