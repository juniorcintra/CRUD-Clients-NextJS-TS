"use client";

import { getClients } from "@/actions/getClients";
import { DataTable } from "@/components/DataClients";
import { Checkbox } from "@/components/ui/checkbox";
import { Client } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const clientsFound = await getClients({ search });
      setClients(clientsFound);
    };
    fetch();
  }, [search]);

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

  return (
    <div className="flex h-full w-full flex-col items-start gap-8">
      <h1 className="text-[32px] font-bold text-black">Clientes</h1>
      <DataTable
        columns={columns}
        data={clients}
        setSearch={setSearch}
        search={search}
      />
    </div>
  );
}
