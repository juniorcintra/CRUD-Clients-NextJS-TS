import BackButtonComponent from "@/components/BackButton";
import { ChevronLeft } from "lucide-react";
import CreateClientForm from "./components/create-client-form";

export default async function Home() {
  return (
    <div className="flex h-full w-full flex-col items-start gap-8">
      <div className="flex items-center gap-4">
        <BackButtonComponent>
          <ChevronLeft />
        </BackButtonComponent>

        <h1 className="text-[32px] font-bold text-black">Cadastrar Cliente </h1>
      </div>
      <CreateClientForm />
    </div>
  );
}
