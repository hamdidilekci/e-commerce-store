import StoreList from "../components/StoreList";
import StoreForm from "../components/StoreForm";
import { StoreDataProvider } from "../contexts/StoreContext";

export default function Home() {
  return (
    <main className="bg-acikGri p-20">
      <StoreDataProvider>
        <StoreForm />
        <StoreList />
      </StoreDataProvider>
    </main>
  );
}
