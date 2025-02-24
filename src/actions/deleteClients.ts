"use server";

import { db } from "@/lib/prisma";

export const deleteClients = async (clientIds: string[]) => {
  await db.client.deleteMany({
    where: {
      id: { in: clientIds },
    },
  });
};
