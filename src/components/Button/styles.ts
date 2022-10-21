
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";


export const ButtonStyle = styled(RectButton).attrs({
  activeOpacity: 0.2,
})`
  justify-content: center;
  background-color: #0D1117;
  padding: 12px;
  border-radius: 8px;
  elevation: 10;
  align-items: center;
`;