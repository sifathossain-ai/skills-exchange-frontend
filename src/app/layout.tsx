import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { ModalProvider } from "@/context/ModalContext";
import { CreatePostModal } from "@/components/modals/CreatePostModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill Exchange Platform",
  description:
    "A high-performance skill exchange barter platform for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased block overflow-x-hidden`}
      >
        <ModalProvider>
          <Shell>{children}</Shell>
          <CreatePostModal />
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </ModalProvider>
      </body>
    </html>
  );
}
