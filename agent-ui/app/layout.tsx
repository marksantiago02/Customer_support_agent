import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ViewTickets from "@/components/ViewTickets";
import CustomerSupport from "@/components/CustomerSupport";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Customer Support AI Agent",
  description: "Welcome to the demo of Customer Support AI Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CustomerSupport />
        <ViewTickets />
        <Toaster position={"top-right"} />
      </body>
    </html>
  );
}
