import React from 'react';
import { genUID, isArray, Literals } from '../helpers';
import { ConfirmlyIcon } from '../ConfirmlyIcon';
import { useConfirmlyContext } from './useConfirmlyContext';
import { notify } from '..';

const dialogTypeWiseIcon = {
  confirm: <ConfirmlyIcon iconName={'confirm'} />,
  alert: <ConfirmlyIcon iconName={'warning'} />,
  info: <ConfirmlyIcon iconName={'info'} />,
};

const defaultDialogConfig = {
  title: null,
  type: 'confirm',
  actions: [],
  onConfirm: undefined,
  onCancel: undefined,
  showIcon: undefined,
  position: undefined,
  divider: false,
  dividerTop: true,
  dividerBottom: false,
  icon: undefined,
};

// useConfirmly Hook
export const useConfirmly = () => {
  const { modalState, modalConfig, setModalState, getModalOrder, clearModals } =
    useConfirmlyContext();

  // Function to Show ConfirmBox
  const showConfirm = (description = '', dialogConfig = {}) => {
    try {
      const configData = { ...defaultDialogConfig, ...dialogConfig };
      const { title, icon, actions, onConfirm, onCancel, showIcon, position, ...otherConfigs } =
        configData;
      const dialogTitle = title || Literals.confirm;
      const dialogIcon = icon || dialogTypeWiseIcon.confirm;
      const dialogPosition = position || modalConfig?.dialogPosition || 'center';
      const dialogShowIcon = showIcon ? showIcon : modalConfig?.showIcons || true;
      const dialogData = {
        id: genUID(),
        title: dialogTitle,
        description,
        actions: isArray(actions) ? actions : [],
        onConfirm: onConfirm,
        onCancel: onCancel,
        icon: dialogIcon,
        showIcon: dialogShowIcon,
        order: getModalOrder(),
        position: dialogPosition,
        config: otherConfigs,
      };

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
      const configData = { ...defaultDialogConfig, ...dialogConfig };
      const { title, icon, actions, showIcon, position, ...otherConfigs } = configData;
      const dialogTitle = title || Literals.alert;
      const dialogIcon = icon || dialogTypeWiseIcon.alert;
      const dialogPosition = position || modalConfig?.dialogPosition || 'center';
      const dialogShowIcon = showIcon ? showIcon : modalConfig?.showIcons || true;
      const dialogData = {
        id: genUID(),
        title: dialogTitle,
        description,
        actions: isArray(actions) ? actions : [],
        icon: dialogIcon,
        showIcon: dialogShowIcon,
        order: getModalOrder(),
        position: dialogPosition,
        config: otherConfigs,
      };

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
      const configData = { ...defaultDialogConfig, ...dialogConfig };
      const { title, icon, actions, showIcon, position, ...otherConfigs } = configData;
      const dialogTitle = title || Literals.info;
      const dialogIcon = icon || dialogTypeWiseIcon.info;
      const dialogPosition = position || modalConfig?.dialogPosition || 'center';
      const dialogShowIcon = showIcon ? showIcon : modalConfig?.showIcons || true;
      const dialogData = {
        id: genUID(),
        title: dialogTitle,
        description,
        actions: isArray(actions) ? actions : [],
        icon: dialogIcon,
        showIcon: dialogShowIcon,
        order: getModalOrder(),
        position: dialogPosition,
        config: otherConfigs,
      };

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
