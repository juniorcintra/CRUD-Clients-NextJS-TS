"use server";

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

export const updateClient = async (params: CreateClientParams) => {
  await db.client.update({
    where: { id: params.id },
    data: {
      name: params.name,
      email: params.email,
      phone: params.phone,
      birthDate: params.birthDate,
      userId: params.userId,
    },
  });

  await db.address.update({
    where: { clientId: params.id },
    data: { ...params.address, clientId: params.id },
  });
};
