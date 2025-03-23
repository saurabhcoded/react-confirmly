import { useConfirmlyStore } from '../ConfirmlyProvider';

export const useConfirmlyContext = () => {
  const { modalState, modalConfig, setModalState, clearModals } = useConfirmlyStore();

  const getModalOrder = (): number => {
    try {
      const modalsArray = Object.values(modalState);
      const lastModal = modalsArray[modalsArray.length - 1];
      return lastModal ? lastModal.order + 1 : 1;
    } catch (err) {
      return 1;
    }
  };

  return { modalState, modalConfig, setModalState, getModalOrder, clearModals };
};
