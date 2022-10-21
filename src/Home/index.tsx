import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import FabButton from "../components/FabButton";
import { Card } from "../components/Card";
import Label from "../components/Label";
import { Container, Header, ItemCard } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useCards } from "../hooks/cards";
import { differenceInDays } from "date-fns";
import { formatMoney } from "../utils/formatMoney";
import VerticalBarGraph from "@chartiful/react-native-vertical-bar-graph";

export default function Home() {
  const { listCards, cards } = useCards();
  const config = {
    hasXAxisBackgroundLines: false,
    xAxisLabelStyle: {
      position: "right",
      prefix: "$",
    },
  };

  const navigation = useNavigation();
  useEffect(() => {
    listCards();
  }, []);

  function diasRestantes(dayClosure: number) {
    const d = new Date();
    const day = d.getDate();
    const mount = d.getUTCMonth() + 1;
    const year = d.getFullYear();
    const result = differenceInDays(
      new Date(year, day > 31 ? mount : mount + 1, dayClosure),
      new Date(year, mount, day)
    );
    return result;
  }
  return (
    <>
      <Container>
        <View>
          <VerticalBarGraph
            data={[20, 45, 28, 80, 99, 43, 50]}
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
            width={375}
            height={300}
            barRadius={5}
            barWidthPercentage={0.65}
            baseConfig={config}
            style={{
              marginBottom: 30,
              padding: 10,
              paddingTop: 20,
              borderRadius: 20,
              backgroundColor: "green",
              width: 375,
            }}
          />
        </View>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Card
                onClick={() =>
                  navigation.navigate("Detalhe", {
                    cardId: item.id,
                    valueMax: item.attributes.value_max,
                    amountSpent: item.attributes.amount_spent,
                    diasRestantes: diasRestantes(item.get("day_closure")),
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={item.get("objectId")}
                >
                  <ItemCard>
                    <Label text="Cartão" fontSize={11} />
                    <Label
                      text={item.attributes.name}
                      color={"#000"}
                      fontSize={20}
                    />
                  </ItemCard>
                  <ItemCard>
                    <Label text="Dias restantes" fontSize={11} />
                    <Label
                      text={diasRestantes(item.get("day_closure"))}
                      color={"#000"}
                      fontSize={20}
                    />
                  </ItemCard>
                  <ItemCard>
                    <Label text="Valor restante" fontSize={11} />
                    <Label
                      text={formatMoney(item.get("amount_spent"))}
                      color={"#000"}
                      fontSize={20}
                    />
                  </ItemCard>
                </View>
              </Card>
            );
          }}
        />
      </Container>
      <FabButton onPress={() => navigation.navigate("AddCards")} />
    </>
  );
}
