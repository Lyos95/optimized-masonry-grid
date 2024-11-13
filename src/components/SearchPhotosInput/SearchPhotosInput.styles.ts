import styled from "styled-components";

export const StyledSearchInput = styled.input`
  width: 66%;
  max-width: 400px;
  padding: 12px 16px;
  border: 1px solid "#ddd";
  border-radius: 8px;
  font-size: 16px;
  background-color: "#fff";
  color: "#333";
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: "#007bff";
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: "#888";
  }
`;
