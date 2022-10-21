import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import Label from "../Label";
import { ButtonStyle } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress, ...rest }: Props) {
  return (
    <ButtonStyle onPress={onPress} {...rest}>
      <Label text={title} color={"#fff"} />
    </ButtonStyle>
  );
}
