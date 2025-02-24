"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Client } from "@/types";
import { Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  default as ButtonComponent,
  default as CustomButton,
} from "./CustomButton";
import { InputField, InputIcon, InputRoot } from "./Input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSearch: (value: string) => void;
  search: string;
  handleDelete: (clientIds: string[]) => Promise<void>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSearch,
  search,
  handleDelete,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [clientsToDelete, setClientsToDelete] = useState<string[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  const prepareDelete = async () => {
    const clientIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => (row.original as Client).id);

    handleDelete(clientIds);
    setIsOpen(false);
  };

  useEffect(() => {
    const clientNames = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => (row.original as Client).name);

    setClientsToDelete(clientNames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, table.getFilteredSelectedRowModel().rows]);

  return (
    <Dialog open={isOpen}>
      <div className="h-fit w-full space-y-4 rounded-md bg-[#18181B] p-6">
        <div className="flex w-full items-center justify-between">
          <InputRoot>
            <InputField
              type="text"
              placeholder="Pesquise por nome ou email"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <InputIcon>
              <Search />
            </InputIcon>
          </InputRoot>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="h-9 max-w-[220px]">
              <DialogTrigger asChild>
                <ButtonComponent
                  type="button"
                  variant="red"
                  onClick={() => setIsOpen(true)}
                >
                  Excluir Selecionado
                  {table.getFilteredSelectedRowModel().rows.length > 1
                    ? "s"
                    : ""}
                  <Trash2 className="size-5" />
                </ButtonComponent>
              </DialogTrigger>
            </div>
          )}
        </div>
        <div className="rounded-md border border-[#27272A]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-white"
                  >
                    Nenhum cliente cadastrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} linhas selecionadas.
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>
      <DialogContent className="!rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-normal">
            <span className="text-red-500">CUIDADO:</span> Você está prestes a
            excluir {clientsToDelete.length} cliente
            {clientsToDelete.length > 1 ? "s" : ""}
          </DialogTitle>
          <DialogDescription>
            <div className="my-4 h-[2px] w-full bg-[#94A3B8]" />
            Tem certeza de que deseja excluir permanentemente{" "}
            {clientsToDelete.length > 1 ? "os clientes " : "o cliente "}
            <span className="text-red-500">
              {clientsToDelete.map((client) => `"${client}"`).join(", ")}
            </span>
            ? Esta ação não pode ser desfeita e todos os dados relacionados{" "}
            {clientsToDelete.length > 1 ? "aos clientes " : "ao cliente "},
            incluindo histórico de empréstimos e faturas, serão removidos
            permanentemente.
            <div className="my-4 h-[2px] w-full bg-[#94A3B8]" />
            <div className="flex w-full justify-end gap-3">
              <DialogClose asChild>
                <CustomButton type="button" variant="gray">
                  Cancelar
                </CustomButton>
              </DialogClose>
              <CustomButton variant="red" type="button" onClick={prepareDelete}>
                <Trash2 className="size-5" />
                Deletar
              </CustomButton>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
