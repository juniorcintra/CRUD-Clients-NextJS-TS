export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address?: Address | null;
};

export type Address = {
  id: string;
  zipCode: string;
  number: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  clientId: string;
};
