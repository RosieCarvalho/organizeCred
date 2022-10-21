import React from "react";
import { View } from "react-native";
import { Container } from "./styles";

interface Props {
  onClick?: () => void;
  children: any;
}

export const Card = ({ onClick, children }: Props) => {
  return <Container onPress={onClick}>{children}</Container>;
};
