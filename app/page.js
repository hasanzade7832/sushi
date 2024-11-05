import Header from "@/components/Header";
import SushiList from "@/components/Sushies/Sushilist";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // یا تم دیگری که دوست دارید
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Home() {
  return (
    <div>
      <Header/>
      <SushiList/>
    </div>
  );
}
