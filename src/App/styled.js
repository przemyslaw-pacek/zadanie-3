import styled, { css } from "styled-components";

export const Header = styled.h1`
  color: yellow;
  margin: 50px;
  text-align: center;

  ${({ $error }) =>
    $error &&
    css`
      color: orange;
    `}
`;
