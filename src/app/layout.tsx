import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { ModalProvider } from "@/context/ModalContext";
import { CreatePostModal } from "@/components/modals/CreatePostModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill Exchange Platform | Barter Skills",
  description: "A high-performance skill exchange barter platform for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased block overflow-x-hidden`}>
        <ModalProvider>
          <Shell>
            {children}
          </Shell>
          <CreatePostModal />
        </ModalProvider>
      </body>
    </html>
  );
}
