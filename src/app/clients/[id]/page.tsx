import BackButtonComponent from "@/components/BackButton";
import { ChevronLeft } from "lucide-react";
import UpdateClientForm from "./components/update-client-form";

interface EditClientProps {
  params: Promise<{ id: string }>;
}

export default async function EditClient(props: EditClientProps) {
  const { id } = await props.params;

  return (
    <div className="flex h-full w-full flex-col items-start gap-8">
      <div className="flex items-center gap-4">
        <BackButtonComponent>
          <ChevronLeft />
        </BackButtonComponent>

        <h1 className="text-[32px] font-bold text-black">Editar Cliente </h1>
      </div>
      <UpdateClientForm id={id} />
    </div>
  );
}
