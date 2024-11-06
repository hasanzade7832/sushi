import SushiList from "@/components/Sushies/Sushilist";
import DetailsProduct from "@/components/DetailsProduct/DetailsProducts";
import { CartProvider } from "@/components/context/CartContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Home() {
  return (
    <CartProvider>
      <div>
        <SushiList />
        <DetailsProduct />
      </div>
    </CartProvider>
  );
}
