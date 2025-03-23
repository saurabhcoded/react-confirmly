import React from 'react';
import { createConfirmly, defaultDialogConfig, genUID, isArray, Literals } from '../helpers';
import { ConfirmlyIcon } from '../ConfirmlyIcon';
import { useConfirmlyContext } from './useConfirmlyContext';
import { notify } from '..';

export const dialogTypeWiseIcon = {
  confirm: <ConfirmlyIcon iconName={'confirm'} />,
  alert: <ConfirmlyIcon iconName={'warning'} />,
  info: <ConfirmlyIcon iconName={'info'} />,
};

// useConfirmly Hook
export const useConfirmly = () => {
  const { modalState, modalConfig, setModalState, getModalOrder, clearModals } =
    useConfirmlyContext();

  // Function to Show ConfirmBox
  const showConfirm = (description = '', dialogConfig = {}) => {
    try {
      const dialogOrder = getModalOrder();
      const configData = {
        description,
        order: dialogOrder,
        ...defaultDialogConfig,
        ...dialogConfig,
      };
      const dialogData = createConfirmly('confirm', configData, modalConfig, dialogTypeWiseIcon);
      setModalState(prevDialogs => ({
        ...prevDialogs,
        [dialogData.id]: dialogData,
      }));
      return dialogData.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Function to show AlertBox
  const showAlert = (description = '', dialogConfig = {}) => {
    try {
      const dialogOrder = getModalOrder();
      const configData = {
        description,
        order: dialogOrder,
        ...defaultDialogConfig,
        ...dialogConfig,
      };
      const dialogData = createConfirmly('alert', configData, modalConfig, dialogTypeWiseIcon);
      setModalState(prevDialogs => ({
        ...prevDialogs,
        [dialogData.id]: dialogData,
      }));
      return dialogData.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Function to show InfoBox
  const showInfo = (description = '', dialogConfig = {}) => {
    try {
      const dialogOrder = getModalOrder();
      const configData = {
        description,
        order: dialogOrder,
        ...defaultDialogConfig,
        ...dialogConfig,
      };
      const dialogData = createConfirmly('info', configData, modalConfig, dialogTypeWiseIcon);
      setModalState(prevDialogs => ({
        ...prevDialogs,
        [dialogData.id]: dialogData,
      }));
      return dialogData.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return {
    confirm: showConfirm,
    alert: showAlert,
    info: showInfo,
    notify: notify,
    modals: modalState,
    clearModals,
  };
};
