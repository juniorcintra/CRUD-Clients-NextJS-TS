export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: Address | null;
};

export type Address = {
  id: string | null;
  zipCode: string | null;
  number: string | null;
  street: string | null;
  complement: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  clientId: string | null;
};
