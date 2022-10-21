import React, { createContext, ReactNode, useContext, useState } from "react";
import Parse from "parse/react-native.js";

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  despesas: returnDespesas;
  despesaAdd: (data: dataDespesas) => Promise<void>;
  listDespesas: (cardId: string) => Promise<void>;
}

interface dataDespesas {
  tipo: string;
  value: number;
  card_id: number;
}
interface resultDespesas {
  card_id: string;
  value: number;
  day_closure: number;
  createdAt: string;
  objectId: string;
  updatedAt: string;
  tipo: string;
}

interface returnDespesas {
  total: string | number;
  items: Parse.Object<resultDespesas>[];
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProviderDespesas({ children }: AuthProviderProps) {
  const [despesas, setDespesas] = useState<returnDespesas>({
    total: 0,
    items: [],
  });

  async function addDespesa(data: dataDespesas) {
    try {
      const newDespesa = new Parse.Object("detall_card");
      newDespesa.set("card_id", data.card_id);
      newDespesa.set("tipo", data.tipo);
      newDespesa.set("value", Number(data.value));
      await newDespesa.save();
    } catch (error) {
      console.log("Error saving new detall: ", error);
    }
  }

  async function listDespesas(cardId: string) {
    const parseQuery: Parse.Query = new Parse.Query("detall_card");
    try {
      parseQuery.contains("card_id", cardId);
      let queryResults = await parseQuery.find();
      const sum = queryResults.reduce((a, b) => a + b.attributes.value, 0);

      setDespesas({
        total: sum,
        items: queryResults || [],
      });
    } catch (error) {
      console.log("err", error);
      // Error can be caused by lack of Internet connection
      // Alert.alert("Error!", error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{ despesas, despesaAdd: addDespesa, listDespesas }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useDespesas() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProviderDespesas, useDespesas };
