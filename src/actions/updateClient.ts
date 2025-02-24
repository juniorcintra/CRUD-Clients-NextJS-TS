"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";

interface CreateClientParams {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  userId: string;
  address?: {
    zipCode: string;
    number: string;
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export const createClients = async (params: CreateClientParams) => {
  await db.client.update({
    where: { id: params.id },
    data: params,
  });

  await db.address.update({
    where: { clientId: params.id },
    data: { ...params.address, clientId: params.id },
  });

  revalidatePath("/clients/new");
  revalidatePath("/");
};
