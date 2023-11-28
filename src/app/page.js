import StoreForm from "../components/StoreForm";
import StoreList from "../components/StoreList";
import Example from "../components/Example";

import { StoreDataProvider } from "../contexts/StoreContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StoreDataProvider>
        <StoreForm />
        {/* <Example /> */}
        <StoreList />
      </StoreDataProvider>
    </main>
  );
}
