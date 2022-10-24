import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import Label from "../../components/Label";
import { ModalComponent } from "../../components/Modal";
import { useDespesas } from "../../hooks/despesas";
import AddDespesa from "../Add";
import { Bloco, Container, Hr, List, TitleList } from "./styles";
import { formatMoney } from "../../utils/formatMoney";
export default function Despesas({ route }) {
  const { cardId, valueMax, amountSpent, diasRestantes } = route.params;
  const { listDespesas, despesas } = useDespesas();

  useEffect(() => {
    listDespesas(cardId);
  }, []);

  const recomendDay = () => {
    const result = diasRestantes / (valueMax - amountSpent);
    return result;
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Container>
        <View>
          <Bloco>
            <Label
              text={`R$ ${formatMoney(valueMax || 0)}`}
              fontSize={20}
              marginVertical={8}
            />
            <Label
              text={`Uso recomendado por dia: ${formatMoney(recomendDay())}`}
              fontSize={12}
            />
          </Bloco>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Card>
              <Bloco>
                <Label text={"gasto"} fontSize={12} marginVertical={8} />
                <Label
                  text={formatMoney(valueMax - amountSpent)}
                  fontSize={15}
                />
              </Bloco>
            </Card>
            <Card>
              <Bloco>
                <Label text={"restante"} fontSize={12} marginVertical={8} />
                <Label text={formatMoney(amountSpent)} fontSize={15} />
              </Bloco>
            </Card>
          </View>
          <TitleList>
            <Label text="Tipo" />
            <Label text="Valor" />
          </TitleList>
          <Hr />
          <FlatList
            data={despesas.items}
            style={{ maxHeight: "70%" }}
            renderItem={({ item }) => {
              return (
                <List>
                  <Label text={item.attributes.tipo} />
                  <Label text={formatMoney(item.attributes.value)} />
                </List>
              );
            }}
          />
          <Hr />
          <TitleList>
            <Label text="Total" />
            <Label text={formatMoney(despesas.total)} />
          </TitleList>
        </View>
        <Button title="Nova despesa" onPress={() => setModalVisible(true)} />
      </Container>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <AddDespesa cardId={cardId} amountSpent={amountSpent} />
      </ModalComponent>
    </>
  );
}
