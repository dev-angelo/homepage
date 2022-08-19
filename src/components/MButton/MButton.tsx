import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
// Typography
import { MBold } from "typography";
// Assets
import icons from "assets/img/icons";

export interface IMButtonProps {
  children?: string;
  accent?: boolean;
  disabled?: boolean;
  to: string;
}

const MButton: React.FC<IMButtonProps> = ({ children, accent, disabled, to }) => {
  const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return (
    <MButtonWrapper
      $accent={accent}
      $disabled={disabled}
      as={to.match(urlRegex) ? "a" : Link}
      {...{ to }}
      href={to}
      target={to.match(urlRegex) ? "_blank" : undefined}
      rel={to.match(urlRegex) ? "noopener noreferrer nofollow" : undefined}
    >
      <MBold>{children}</MBold>
      <ButtonIcon
        src={icons.chevronRight}
        {...{ accent, disabled }}
        style={{ marginLeft: "0.4rem" }}
      />
    </MButtonWrapper>
  );
};

const MButtonWrapper = styled(Link)<{ $accent?: boolean; $disabled?: boolean }>`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  height: 3.8rem;
  padding: 0 2.4rem;
  color: ${({ $accent, $disabled, theme: { color } }) =>
    $disabled
      ? color.greyScale.grey4
      : $accent
      ? color.blackAndWhite.white
      : color.greyScale.grey1};
  border: 0.1rem solid;
  border-radius: 3rem;
  border-color: ${({ $accent, $disabled, theme: { color } }) =>
    $disabled
      ? color.greyScale.grey4
      : $accent
      ? color.blackAndWhite.black
      : color.greyScale.grey3};
  background-color: ${({ $disabled, $accent, theme: { color } }) =>
    $disabled
      ? color.blackAndWhite.white
      : $accent
      ? color.blackAndWhite.black
      : color.blackAndWhite.white};
  text-decoration: none;
  text-align: center;
  cursor: ${({ $disabled }) => ($disabled ? "unset" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  &:hover {
    color: ${({ $disabled, theme: { color } }) =>
      $disabled ? color.greyScale.grey4 : color.blackAndWhite.black};
    background-color: ${({ $disabled, theme: { color } }) =>
      $disabled ? color.blackAndWhite.white : color.primary.green4};
    border-color: ${({ $disabled, theme: { color } }) =>
      $disabled ? color.greyScale.grey4 : color.blackAndWhite.black};
  }
  &:disabled {
    cursor: auto;
  }
`;

const ButtonIcon = styled.img<{ accent?: boolean; disabled?: boolean }>`
  width: 1.6rem;
  height: 1.6rem;
  filter: ${({ accent, disabled }) =>
    disabled
      ? "invert(87%) sepia(1%) saturate(45%) hue-rotate(314deg) brightness(105%) contrast(85%)"
      : accent
      ? "invert(99%) sepia(99%) saturate(0%) hue-rotate(346deg) brightness(107%) contrast(101%)"
      : "none"};
  ${MButtonWrapper}:hover & {
    filter: ${({ accent, disabled }) =>
      disabled
        ? "invert(85%) sepia(0%) saturate(0%) hue-rotate(69deg) brightness(100%) contrast(100%)"
        : accent
        ? "none"
        : "invert(8%) sepia(4%) saturate(11%) hue-rotate(79deg) brightness(104%) contrast(94%)"}
`;

export default MButton;
