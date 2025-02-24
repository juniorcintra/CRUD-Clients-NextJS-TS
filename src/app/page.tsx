"use client";

import { getClients } from "@/actions/getClients";
import { DataTable } from "@/components/DataClients";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFormatPhone from "@/hooks/use-format-phone";
import { Client } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const { formatPhone } = useFormatPhone();
  const { push } = useRouter();

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
      cell(props) {
        return <span>{formatPhone(props.row.original?.phone)}</span>;
      },
    },
    {
      accessorKey: "birthDate",
      header: "Nascimento",
    },
    {
      accessorKey: "address",
      header: "Endereço",
      cell(props) {
        return (
          <span>
            {props.row.original?.address?.street},{" "}
            {props.row.original?.address?.number}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const clientId = row.original.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ações</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => push(`/clients/${clientId}`)}
              >
                Editar cliente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
