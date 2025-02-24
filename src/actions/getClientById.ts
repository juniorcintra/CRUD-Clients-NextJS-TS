"use server";

import { db } from "@/lib/prisma";

interface GetClientByIdProps {
  clientId: string;
}

export const getClientById = async ({ clientId }: GetClientByIdProps) => {
  return await db.client.findUnique({
    where: {
      id: clientId,
    },
    include: { address: true },
  });
};
