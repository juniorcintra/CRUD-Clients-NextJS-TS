"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";

interface CreateClientParams {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  userId: string;
  address?: {
    zipCode: string;
    number: string;
    street: string;
    complement?: string | undefined;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export const createClient = async (params: CreateClientParams) => {
  const clientCreated = await db.client.create({
    data: params,
  });

  await db.address.create({
    data: { ...params.address, clientId: clientCreated.id },
  });

  revalidatePath("/clients/new");
  revalidatePath("/");
};
