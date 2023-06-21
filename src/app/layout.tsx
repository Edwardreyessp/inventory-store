import "./globals.css";
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "iStock",
  description: "iStock es una plataforma de compra y venta de imágenes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={publicSans.className}>{children}</body>
    </html>
  );
}
