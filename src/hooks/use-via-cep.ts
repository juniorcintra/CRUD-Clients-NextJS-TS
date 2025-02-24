import { useState, useCallback } from "react";

const useViaCep = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAddress = useCallback(async (cep: string) => {
    if (!cep || cep.length !== 8) return;

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setAddress(data);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP", error);
      setAddress(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { address, fetchAddress, loading };
};

export default useViaCep;
