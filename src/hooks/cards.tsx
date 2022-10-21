import React, { createContext, ReactNode, useContext, useState } from "react";
import Parse from "parse/react-native.js";

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  cards: Parse.Object<resultCards>[];
  addCard: (data: dataCard) => Promise<void>;
  listCards: () => Promise<void>;
}

interface dataCard {
  name: string;
  value_max: number;
  day_closure: number;
}
interface resultCards {
  name: string;
  value_max: number;
  day_closure: number;
  createdAt: string;
  objectId: string;
  updatedAt: string;
  amount_spent: number;
  color: string;
}

const colorCards = {
  "nu bank": "#630094",
  Inter: "orange",
  "Banco do Brasil": "#FFC83D",
};

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [cards, setCards] = useState<Parse.Object<resultCards>[]>([]);

  async function addCard(data: dataCard) {
    try {
      const newCard = new Parse.Object("cards");
      console.log("data.name", data.name);
      const color = colorCards[String(data.name)];

      newCard.set("name", data.name);
      newCard.set("color", color);
      newCard.set("value_max", Number(data.value_max));
      newCard.set("day_closure", Number(data.day_closure));

      await newCard.save();
    } catch (error) {
      console.log("Error saving new person: ", error);
    }
  }

  async function listCards() {
    const parseQuery: Parse.Query = new Parse.Query("cards");
    try {
      let todos: Parse.Object<resultCards>[] = await parseQuery.findAll();

      setCards(todos);
    } catch (error) {
      console.log("err", error);
      // Error can be caused by lack of Internet connection
      // Alert.alert("Error!", error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ cards: cards, addCard: addCard, listCards }}>
      {children}
    </AuthContext.Provider>
  );
}
function useCards() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useCards };
