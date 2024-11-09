import SushiList from "@/components/Sushies/Sushilist";
<<<<<<< HEAD
import "primereact/resources/themes/lara-light-indigo/theme.css"; // یا تم دیگری که دوست دارید
=======
import DetailsProduct from "@/components/DetailsProduct/DetailsProducts";
import { CartProvider } from "@/components/context/CartContext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
>>>>>>> 438a634ae7dc9ee0b436522364f5e5433ea5a483
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Home() {
  return (
      <div>
        <SushiList />
      </div>
  );
}
