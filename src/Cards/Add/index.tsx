import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { TextInput } from "react-native";
import Button from "../../components/Button";
import { InputForm } from "../../components/InputForm";
import { useCards } from "../../hooks/cards";

interface dataCard {
  name: string;
  value_max: number;
  day_closure: number;
}

export default function AddCards() {
  const { addCard } = useCards();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  function onSubmit(data: dataCard) {
    console.log("data", data);
    addCard(data);
    navigation.goBack();
  }
  return (
    <View>
      <InputForm
        label="Nome Cartão"
        name="name"
        control={control}
        placeholder="Nome"
        autoCapitalize="sentences"
        autoCorrect
        error={errors.name && errors.name.message}
      />
      <InputForm
        label="Valor de uso máximo"
        name="value_max"
        control={control}
        keyboardType="numbers-and-punctuation"
        placeholder="valor Máximo"
        autoCapitalize="sentences"
        autoCorrect
        error={errors.value_max && errors.value_max.message}
      />
      <InputForm
        label="Dia fechamento cartão"
        name="day_closure"
        keyboardType="numeric"
        control={control}
        placeholder="Dia fechamento"
        autoCapitalize="sentences"
        autoCorrect
        error={errors.day_closure && errors.day_closure.message}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        title="Salvar"
        style={{ marginHorizontal: 10, marginVertical: 20 }}
      />
    </View>
  );
}
