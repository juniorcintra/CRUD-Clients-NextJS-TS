"use server";

import { db } from "@/lib/prisma";

export const deleteBooking = async (clientIds: string[]) => {
  await db.client.deleteMany({
    where: {
      id: { in: clientIds },
    },
  });
};
