// app/layout.js
import Header from "@/components/Header";
import { CartProvider } from "@/components/context/CartContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";
import { CartProvider } from "@/components/context/CartContext";
import Header from "@/components/Header";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <div className="mt-10">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>


  );
}
 