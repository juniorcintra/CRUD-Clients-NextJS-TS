import { useCallback } from "react";

const useFormatPhone = () => {
  const formatPhone = useCallback((phone: string) => {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length === 11) {
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
    }

    if (cleaned.length === 10) {
      const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
    }
  }, []);

  return { formatPhone };
};

export default useFormatPhone;
