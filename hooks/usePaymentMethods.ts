import { useEffect, useState } from "react";
import { EntriesAPI } from "../APIs/EntryAPI";

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<{ label: string; value: number }[]>([]);

  const fetchPaymentMethods = async () => {
    try {
      const response: { paymentMethod: string; id: number }[] = await EntriesAPI.getEntries();

      const paymentMethods = Array.from(
        new Map(
          response.map((method: { paymentMethod: string; id: number }) => [
            method.paymentMethod,
            { label: method.paymentMethod, value: method.id },
          ])
        ).values()
      );
      setPaymentMethods(paymentMethods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return paymentMethods;
};
