import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface Props extends TextStyle {
  text: string | number;
}

export default function Label({ text, ...rest }: Props) {
  return <Text style={rest}>{text}</Text>;
}
