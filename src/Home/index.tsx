import React, { useEffect } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import FabButton from "../components/FabButton";
import { Card } from "../components/Card";
import Label from "../components/Label";
import { Container, Header, ItemCard } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useCards } from "../hooks/cards";
import { differenceInDays } from "date-fns";
import { formatMoney } from "../utils/formatMoney";
import { BarChart } from "react-native-chart-kit";
import { DataStore } from "aws-amplify";
import { Todo } from "./models";

export default function Home() {
  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(200, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };
  const data = {
    labels: ["Inter", "Nu", "BB", "Ame"],
    datasets: [
      {
        data: [100, 200, 300, 150],
      },
    ],
  };
  const { listCards, cards } = useCards();

  const navigation = useNavigation();

  const addCard = async () => {
    await DataStore.save(new Todo({ name: "teste", description: "teste" }))
      .then((res) => console.log("res", res))
      .catch((err) => console.log("er", err));
  };

  useEffect(() => {
    listCards();
    //testar o add
    addCard();
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
        <View style={{ marginBottom: 40 }}>
          <BarChart
            style={{
              marginHorizontal: 10,
              marginVertical: 8,
              borderRadius: 16,
              backgroundColor: "#fff",
            }}
            data={data}
            // yAxisLabel={"-"}
            width={Dimensions.get("window").width - 50}
            // yAxisSuffix={"-"}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
        <FlatList
          data={cards}
          ListHeaderComponent={
            <View style={{ marginHorizontal: 18 }}>
              <Label text={"Cartões"} fontSize={20} />
            </View>
          }
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
