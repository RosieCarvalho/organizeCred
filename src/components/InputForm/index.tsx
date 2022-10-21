import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Input } from "../Input";
import Label from "../Label";
import { Container, Error } from "./styles";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
  label: string;
}

export function InputForm({ control, name, label, error, ...rest }: Props) {
  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Label text={label} />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input onChangeText={onChange} value={value} {...rest} />
          )}
          name={name}
        />
      </TouchableWithoutFeedback>
      {error && <Error>{error}</Error>}
    </Container>
  );
}
