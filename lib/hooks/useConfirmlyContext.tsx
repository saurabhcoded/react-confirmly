import React from 'react';
import { ModalContext } from '../ConfirmlyProvider';

export const useConfirmlyContext = () => {
  const { modalState, modalConfig, setModalState, clearModals } = React.useContext(ModalContext);

  const getModalOrder = (): number => {
    try {
      let modalsArray = Object.values(modalState);
      const lastModal = modalsArray[modalsArray.length - 1];
      if (lastModal) return lastModal?.order + 1;
      return 1;
    } catch (err) {
      return 1;
    }
  };

  return { modalState, modalConfig, setModalState, getModalOrder, clearModals };
};
