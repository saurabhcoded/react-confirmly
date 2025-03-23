import { ReactNode } from 'react';
import { getContext, updateContext } from './ConfirmlyProvider';
import { createConfirmly, defaultDialogConfig } from './helpers';
import { dialogTypeWiseIcon } from './hooks';
import { Notify as notify } from './Notify';
import { DialogActionInterface } from './types';
import { ConfirmlyDialogPositions } from './types';

interface dialogFunctionConfig {
  title?: string | null;
  type: 'confirm' | 'alert' | 'info';
  actions?: DialogActionInterface[];
  onConfirm?: () => void;
  onCancel?: () => void;
  showIcon?: boolean;
  position?: ConfirmlyDialogPositions;
  divider?: boolean;
  dividerTop?: boolean;
  dividerBottom?: boolean;
  icon?: ReactNode;
  [key: string]: any;
}
// These functions are used to show the confirm, alert and info dialogs
const showConfirm = (
  description: string = '',
  dialogConfig: dialogFunctionConfig
): string | null => {
  try {
    let prevStates = getContext();
    const dialogOrder = Object.keys(prevStates.modalState).length + 1;
    const modalConfig = prevStates.modalConfig;
    const configData = {
      description,
      order: dialogOrder,
      ...defaultDialogConfig,
      ...dialogConfig,
    };
    const dialogData = createConfirmly('confirm', configData, modalConfig, dialogTypeWiseIcon);
    updateContext({
      ...prevStates,
      modalState: {
        ...prevStates.modalState,
        [dialogData.id]: dialogData,
      },
    });
    return dialogData.id;
  } catch (err) {
    console.error(err);
    return null;
  }
};
const showAlert = (description: string = '', dialogConfig: dialogFunctionConfig): string | null => {
  try {
    let prevStates = getContext();
    const dialogOrder = Object.keys(prevStates.modalState).length + 1;
    const modalConfig = prevStates.modalConfig;
    const configData = {
      description,
      order: dialogOrder,
      ...defaultDialogConfig,
      ...dialogConfig,
    };
    const dialogData = createConfirmly('alert', configData, modalConfig, dialogTypeWiseIcon);
    updateContext({
      ...prevStates,
      modalState: {
        ...prevStates.modalState,
        [dialogData.id]: dialogData,
      },
    });
    return dialogData.id;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Function to show InfoBox
const showInfo = (description: string = '', dialogConfig: dialogFunctionConfig): string | null => {
  try {
    let prevStates = getContext();
    const dialogOrder = Object.keys(prevStates.modalState).length + 1;
    const modalConfig = prevStates.modalConfig;
    const configData = {
      description,
      order: dialogOrder,
      ...defaultDialogConfig,
      ...dialogConfig,
    };
    const dialogData = createConfirmly('info', configData, modalConfig, dialogTypeWiseIcon);
    updateContext({
      ...prevStates,
      modalState: {
        ...prevStates.modalState,
        [dialogData.id]: dialogData,
      },
    });
    return dialogData.id;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getModals = () => {
  let prevStates = getContext();
  return prevStates.modalState;
};

const clearModals = () => {
  let prevStates = getContext();
  updateContext({ ...prevStates, modalState: {} });
};

export const confirmly = {
  confirm: showConfirm,
  alert: showAlert,
  info: showInfo,
  notify,
  getModals,
  clearModals,
};
