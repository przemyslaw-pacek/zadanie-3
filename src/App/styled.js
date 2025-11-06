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

export const Table = styled.table`
  border: 2px solid grey;
  border-collapse: collapse;
  margin: 0 auto;
`;

export const TableRow = styled.tr`
  border: 1px solid grey;
  font-size: large;

  ${({ $header }) =>
    $header &&
    css`
      color: orange;
      background-color: black;
      text-transform: uppercase;
    `}

  @media (max-width: 678px) {
    font-size: small;
  }
`;

const cell = css`
  border: 1px solid grey;
  padding: 10px;
`;

export const TableHeader = styled.th`
  ${cell}
`;

export const TableData = styled.td`
  ${cell}

  &:hover {
    color: black;
    background: darkgray;
  }

  &:active {
    background: lightgray;
  }
`;
