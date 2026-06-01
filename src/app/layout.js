import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/navbar";
import Footer from "./component/footer";
import { AuthProvider } from "./lib/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "MT Shop — Premium E-Commerce",
  description:
    "Discover premium products at unbeatable prices. Shop electronics, clothing, home goods and more at MT Shop.",
  keywords: "ecommerce, online shop, premium products, MT Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <AuthProvider>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
