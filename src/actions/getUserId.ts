"use server";

import { db } from "@/lib/prisma";

interface GetUserByEmailProps {
  email: string;
}

export const getUserByEmail = async ({ email }: GetUserByEmailProps) => {
  return await db.user.findFirst({
    where: {
      email,
    },
  });
};
