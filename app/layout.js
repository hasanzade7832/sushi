// app/layout.js
import Header from "@/components/Header";
import { CartProvider } from "@/components/context/CartContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="fa">
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </CartProvider>
  );
}
 