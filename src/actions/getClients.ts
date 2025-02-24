"use server";

import { db } from "@/lib/prisma";

interface GetClientsProps {
  search: string;
}

export const getClients = async ({ search }: GetClientsProps) => {
  return db.client.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    },
    include: {
      address: true,
    },
  });
};
