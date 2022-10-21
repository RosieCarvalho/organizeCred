import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../../components/Button";
import { InputForm } from "../../components/InputForm";
import Label from "../../components/Label";
import { useDespesas } from "../../hooks/despesas";

interface dataCard {
  tipo: string;
  value: number;
  card_id: number;
}

interface Props {
  cardId: number;
}

export default function AddDespesa({ cardId }: Props) {
  const { despesaAdd } = useDespesas();
  const navigation = useNavigation();
  const [selectedTipo, setSelectedTipo] = useState("nu");
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({});

  function onSubmit(data: dataCard) {
    const dataItem = {
      tipo: selectedTipo,
      value: data.value,
      card_id: cardId,
    };
    console.log("data", dataItem);

    despesaAdd(dataItem);
    navigation.goBack();
  }
  return (
    <>
      <View style={{ width: 240, marginHorizontal: 10 }}>
        <Label text={"Selecione um Tipo"} />

        <Picker
          selectedValue={selectedTipo}
          onValueChange={(itemValue, itemIndex) => setSelectedTipo(itemValue)}
          numberOfLines={1}
          itemStyle={{
            lineHeight: 2,
            padding: 0,
            fontSize: 15,
          }}
        >
          <Picker.Item label="Comida" value="comida" />
          <Picker.Item label="Passeio" value="passeio" />
          <Picker.Item label="Casa" value="casa" />
          <Picker.Item label="Pessoal" value="pessoal" />
        </Picker>

        <InputForm
          label="Valor"
          name="value"
          control={control}
          keyboardType="numbers-and-punctuation"
          placeholder="valor Máximo"
          autoCapitalize="sentences"
          autoCorrect
          error={errors.value && errors.value.message}
        />
      </View>
      <Button onPress={handleSubmit(onSubmit)} title="Salvar" />
    </>
  );
}
