"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteBooking = async (clientIds: string[]) => {
  await db.client.deleteMany({
    where: {
      id: { in: clientIds },
    },
  });

  revalidatePath("/");
};
