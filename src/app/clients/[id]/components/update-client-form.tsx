"use client";

import { getClientById } from "@/actions/getClientById";
import { getUserByEmail } from "@/actions/getUserId";
import { updateClient } from "@/actions/updateClient";
import CustomButton from "@/components/CustomButton";
import { InputField, InputIcon, InputRoot } from "@/components/Input";
import useViaCep from "@/hooks/use-via-cep";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  House,
  Mail,
  MapPin,
  Pencil,
  Phone,
  TextCursor,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const updateClientSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  email: z.string().email("Digite um e-mail válido"),
  phone: z.string().min(10, "Digite um telefone válido"),
  birthDate: z.string().refine(
    (date) => {
      const [day, month, year] = date.split("/");
      const isoDate = `${year}-${month}-${day}`;
      return !isNaN(Date.parse(isoDate));
    },
    {
      message: "Digite uma data de nascimento válida",
    },
  ),
  id: z.string().uuid("ID de usuário inválido"),
  userId: z.string().uuid("ID de usuário inválido").optional(),
  address: z.object({
    zipCode: z.string().min(8, "CEP inválido"),
    number: z.string().min(1, "Número obrigatório"),
    street: z.string().min(3, "Rua obrigatória"),
    complement: z.string().optional(),
    neighborhood: z.string().min(3, "Bairro obrigatório"),
    city: z.string().min(3, "Cidade obrigatória"),
    state: z.string().length(2, "UF inválida"),
  }),
});

type UpdateClientSchema = z.infer<typeof updateClientSchema>;

export default function UpdateClientForm({ id }: { id: string }) {
  const { push } = useRouter();
  const { data } = useSession();
  const { fetchAddress } = useViaCep();

  const [userId, setUserId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateClientSchema>({
    resolver: zodResolver(updateClientSchema),
  });
  
  async function onSubcribe(data: UpdateClientSchema) {
    await updateClient({ ...data, userId, id });
    push(`/`);
  }

  const handleGetUserId = useCallback(async () => {
    if (!data || !data.user?.email) return;

    const user = await getUserByEmail({ email: data.user.email });

    if (user?.id) {
      setUserId(user.id);
    }
  }, [data, setUserId]);

  useEffect(() => {
    handleGetUserId();
  }, [handleGetUserId]);

  const zipCode = watch("address.zipCode");

  const handleGetAddress = useCallback(async () => {
    if (zipCode?.length < 8) return;

    const response = await fetchAddress(zipCode);

    if (response) {
      setValue("address.street", response?.logradouro);
      setValue("address.neighborhood", response?.bairro);
      setValue("address.city", response?.localidade);
      setValue("address.state", response?.uf);
    }
  }, [zipCode, fetchAddress, setValue]);

  const addressField = watch("address");

  const hasAddress = addressField?.zipCode?.length === 8;

  useEffect(() => {
    handleGetAddress();
  }, [handleGetAddress]);

  const handleGetClientById = useCallback(async () => {
    const client = await getClientById({ clientId: id });

    if (client) {
      setValue("id", client.id);
      setValue("name", client.name);
      setValue("email", client.email);
      setValue("phone", client.phone);
      setValue("birthDate", client.birthDate);
      if (client?.address) {
        setValue("address.zipCode", client.address.zipCode as string);
        setValue("address.number", client.address.number as string);
        setValue("address.complement", client.address.complement as string);
      }
    }
  }, [id, setValue]);

  useEffect(() => {
    handleGetClientById();
  }, [handleGetClientById]);
  return (
    <form
      method=""
      onSubmit={handleSubmit(onSubcribe)}
      className="w-full space-y-6 rounded-2xl border border-gray-600 bg-[#27272A] p-8"
    >
      <div className="flex w-full space-x-3">
        <div className="flex-1 space-y-2">
          <InputRoot variant="full">
            <InputField
              type="text"
              placeholder="Nome *"
              {...register("name")}
            />
            <InputIcon>
              <TextCursor />
            </InputIcon>
          </InputRoot>
          {errors.name && (
            <span className="text-xs font-semibold text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <InputRoot variant="full">
            <InputField
              type="email"
              placeholder="E-mail *"
              {...register("email")}
            />
            <InputIcon>
              <Mail />
            </InputIcon>
          </InputRoot>
          {errors.email && (
            <span className="text-xs font-semibold text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full space-x-3">
        <div className="flex-1 space-y-2">
          <InputRoot variant="full">
            <InputField
              type="text"
              placeholder="Telefone *"
              {...register("phone")}
            />
            <InputIcon>
              <Phone />
            </InputIcon>
          </InputRoot>
          {errors.phone && (
            <span className="text-xs font-semibold text-red-500">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <InputRoot variant="full">
            <InputField
              placeholder="Data de nascimento (dd/mm/aaaa) *"
              {...register("birthDate")}
            />
            <InputIcon>
              <Calendar />
            </InputIcon>
          </InputRoot>
          {errors.birthDate && (
            <span className="text-xs font-semibold text-red-500">
              {errors.birthDate.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full space-x-3">
        <div className="flex-1 space-y-2">
          <InputRoot variant="full">
            <InputField
              type="text"
              placeholder="CEP *"
              {...register("address.zipCode")}
            />
            <InputIcon>
              <Phone />
            </InputIcon>
          </InputRoot>
          {errors.address?.zipCode && (
            <span className="text-xs font-semibold text-red-500">
              {errors.address.zipCode.message}
            </span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <InputRoot variant="full">
            <InputField
              type="text"
              placeholder="Número *"
              {...register("address.number")}
            />
            <InputIcon>
              <House />
            </InputIcon>
          </InputRoot>
          {errors.address?.number && (
            <span className="text-xs font-semibold text-red-500">
              {errors.address.number.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full space-x-3">
        <div className="flex-1 space-y-2">
          <InputRoot variant="full">
            <InputField
              type="text"
              placeholder="Complemento"
              {...register("address.complement")}
            />
            <InputIcon>
              <House />
            </InputIcon>
          </InputRoot>
          {errors.address?.complement && (
            <span className="text-xs font-semibold text-red-500">
              {errors.address.complement.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full space-x-3">
        <div className="flex-1 space-y-2">
          <InputRoot variant="full">
            <InputField
              value={
                hasAddress
                  ? `${addressField?.street}, ${addressField?.number ? "nº " + addressField?.number + ", " : ""}${addressField?.complement ? addressField?.complement + ", " : ""}${addressField?.neighborhood} - ${addressField?.city}/${addressField?.state}`
                  : ""
              }
              placeholder={hasAddress ? "" : "Endereço *"}
              disabled
            />
            <InputIcon>
              <MapPin />
            </InputIcon>
          </InputRoot>
        </div>
      </div>
      <div className="flex w-full justify-end gap-3">
        <CustomButton type="button" variant="gray" onClick={() => push("/")}>
          Cancelar
        </CustomButton>
        <CustomButton type="submit">
          Editar
          <Pencil />
        </CustomButton>
      </div>
    </form>
  );
}
