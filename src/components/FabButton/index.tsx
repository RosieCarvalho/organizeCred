import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Container } from "./styles";

interface Props extends RectButtonProps {
  onPress: () => void;
}

export default function FabButton({ onPress, ...rest }: Props) {
  return (
    <Container>
      <AntDesign name="pluscircle" size={52} color="black" onPress={onPress} />
    </Container>
  );
}
