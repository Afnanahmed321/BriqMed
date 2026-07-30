import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Gentium_Book_Plus } from "next/font/google";

const gentium = Gentium_Book_Plus({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "BRIQMED - Provider Enrollment & Credentialing",
  description: "Provider Enrollment & Credentialing Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={gentium.className}>
        <Navbar />

        <main className="pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}