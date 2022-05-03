import React from "react";
import styled from "styled-components";
// Type
import { ISButtonProps } from "./SButton.type";
// Typography
import { XSBody } from "typography/";

const SButton: React.FC<ISButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <SButtonWrapper {...{ disabled, onClick }}>
      <XSBody>{children}</XSBody>
    </SButtonWrapper>
  );
};

const SButtonWrapper = styled.button`
  color: ${({ theme: { color } }) => color.greyScale.white};
  height: 3.2rem;
  padding: 0 0.8rem;
  border-width: 0;
  border-radius: 0.8rem;
  background-color: ${({ theme: { color } }) => color.greyScale.black};
  border-color: ${({ theme: { color } }) => color.greyScale.black};
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: ${({ theme: { color } }) => color.greyScale.grey1};
    border-color: ${({ theme: { color } }) => color.greyScale.grey1};
  }
  &:disabled {
    cursor: auto;
    color: ${({ theme: { color } }) => color.greyScale.white20};
    background-color: ${({ theme: { color } }) => color.greyScale.grey2};
    border-color: ${({ theme: { color } }) => color.greyScale.grey2};
  }
`;

export default SButton;
