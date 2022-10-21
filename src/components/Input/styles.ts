import styled, { css } from "styled-components/native";

interface Props {
  active: boolean;
}

export const Container = styled.TextInput<Props>`  
  padding: 13px 10px 13px;  
  font-size: 15px;
  border-radius: 5px;
  border-color: #282C34 ;
  margin-bottom: 8px;
  border-width: 2px;
  ${({ active }) =>
    active &&
    css`
      border-width: 3px;
      border-color: #EF3B6D;
    `}
`;