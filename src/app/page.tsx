"use client";

import { DataTable } from "@/components/DataClients";
import { Checkbox } from "@/components/ui/checkbox";
import { Client } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export default function Home() {
  const columns: ColumnDef<Client>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "phone",
      header: "Telefone",
    },
    {
      accessorKey: "birthDate",
      header: "Nascimento",
    },
    {
      accessorKey: "address.street",
      header: "Endereço",
    },
  ];

  const data: Client[] = [
    {
      id: "1",
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "11987654321",
      birthDate: "1990-05-12",
      address: {
        id: "a1",
        zipCode: "01000-000",
        number: "123",
        street: "Rua das Flores",
        complement: "Apto 101",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: "1",
      },
    },
    {
      id: "2",
      name: "Maria Souza",
      email: "maria.souza@email.com",
      phone: "21987654321",
      birthDate: "1985-10-20",
      address: {
        id: "a2",
        zipCode: "22000-000",
        number: "456",
        street: "Avenida Paulista",
        complement: "Sala 502",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: "2",
      },
    },
    {
      id: "3",
      name: "Carlos Pereira",
      email: "carlos.pereira@email.com",
      phone: "31987654321",
      birthDate: "1995-07-08",
      address: {
        id: "a3",
        zipCode: "30000-000",
        number: "789",
        street: "Rua das Palmeiras",
        complement: "",
        neighborhood: "Savassi",
        city: "Belo Horizonte",
        state: "MG",
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: "3",
      },
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-start gap-8">
      <h1 className="text-[32px] font-bold text-black">Clientes</h1>
      <DataTable columns={columns} data={data} />;
    </div>
  );
}
