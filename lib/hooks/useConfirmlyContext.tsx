import React from "react";
import { ModalContext } from "../ConfirmlyProvider";

export const useConfirmlyContext = () => {
  const { modalState, setModalState, clearModals } =
    React.useContext(ModalContext);

  const getModalOrder = (): number => {
    try {
      const lastModal = modalState?.[modalState.length - 1];
      if (lastModal) return lastModal?.order + 1;
      return 1;
    } catch (err) {
      return 1;
    }
  };

  return { modalState, setModalState, getModalOrder, clearModals };
};