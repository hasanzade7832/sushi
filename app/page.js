import Header from "@/components/Header";
import SushiList from "@/components/Sushies/Sushilist";
import DetailsProduct from "@/components/DetailsProduct/DetailsProducts";
import { CartProvider } from "@/components/context/CartContext";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // یا تم دیگری که دوست دارید
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Home() {
  return (
    <CartProvider>
      <div>
        <Header />
        <SushiList />
        <DetailsProduct />
      </div>
    </CartProvider>
  );
}
