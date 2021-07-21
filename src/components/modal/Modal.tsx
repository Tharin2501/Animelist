import React from "react";
import { ModalStyleType, ModalType } from "./ModalType";
import styled from "styled-components";
import { CloseButton } from "../button/OtherButtons";
import { FiHeart } from "react-icons/fi";
import { DefaultButton } from "../button/DefaultButton";

const ModalOverlay = styled.div<ModalStyleType>`
  position: fixed; // Stay in place
  left: 0;
  top: 0;
  width: 100%; // Full width
  height: 100%; // Full height
  background-color: rgba(0, 0, 0, 0.4); // Overlay color Black w/ opacity
`;

const ModalContent = styled.div<ModalStyleType>`
  width: 40%;
  padding: 12px;
  border-radius: 9px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.6);
  // dark and light theme
  background-color: ${(props) => {
    switch (props.modalColor) {
      case "light":
        return "white";
      case "dark":
        return "lightGrey";
    }
  }};
  color: ${(props) => {
    switch (props.modalColor) {
      case "light":
        return "black";
      case "dark":
        return "white";
    }
  }};
  /* POSTION PROP, src: https://stackoverflow.com/questions/48502647/conditional-rendering-in-styled-components */
  ${({ openPos }) =>
    openPos === "TOP" &&
    // margin 0 auto:  0 for top-bottom, and auto for left-right.
    `
    margin: 0 auto;
  `}
  ${({ openPos }) =>
    openPos === "CENTER" &&
    // OR margin: 15% auto;
    `
    margin-top: 15%;
    margin-bottom: 15%;
    margin-left: auto;
    margin-right: auto;
  `}
  ${({ openPos }) => openPos === "BOTTOM" && `margin: 40% auto;`}
`;

const CloseButtonWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
`;

const FlexCenterColumn = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 9px;
`;

const ButtonContainer = styled.span`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
`;

/*
https://medium.com/@lucksp_22012/pure-react-modal-6e562a317b85
https://www.w3schools.com/howto/howto_css_modals.asp 
*/
const Modal: React.FunctionComponent<ModalType> = ({
  title,
  onClickPost,
  onClickClose,
  modalColor = "light",
  openPos = "CENTER",
  icon = <FiHeart size={24} color="red" />,
  children,
}) => {
  return (
    <ModalOverlay>
      <ModalContent modalColor={modalColor} openPos={openPos}>
        <CloseButtonWrapper>
          <CloseButton size={18} onClick={onClickClose}>
            X
          </CloseButton>
        </CloseButtonWrapper>
        <FlexCenterColumn>{icon}</FlexCenterColumn>
        <FlexCenterColumn>
          <b>{title}</b>
          {children}
        </FlexCenterColumn>
        <FlexCenterColumn>
          <ButtonContainer>
            <DefaultButton
              bordered
              bgColorHover="tomato"
              onClick={onClickClose}
            >
              Cancel
            </DefaultButton>
            <DefaultButton bordered onClick={onClickPost}>
              Yes
            </DefaultButton>
          </ButtonContainer>
        </FlexCenterColumn>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
