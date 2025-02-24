"use server";

import { db } from "@/lib/prisma";

interface GetClientByIdProps {
  clientId: string;
}

export const getClientById = ({ clientId }: GetClientByIdProps) => {
  return db.client.findMany({
    where: {
      id: clientId,
    },
  });
};
