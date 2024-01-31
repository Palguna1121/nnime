import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "nnime",
  description: "nnime build with next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
