import React from "react";
import { genUID, isArray, Literals } from "../helpers";
import { ConfirmlyIcon } from "../ConfirmlyIcon";
import { useConfirmlyContext } from "./useConfirmlyContext";
import { notify } from "..";

const dialogTypeWiseIcon = {
  confirm: <ConfirmlyIcon iconName={"confirm"} />,
  alert: <ConfirmlyIcon iconName={"warning"} />,
  info: <ConfirmlyIcon iconName={"info"} />,
};

const defaultDialogConfig = {
  title: null,
  type: "confirm",
  actions: [],
  onConfirm: null,
  onCancel: null,
  showIcon: true,
  divider: false,
  dividerTop: true,
  dividerBottom: false,
};

// useConfirmly Hook
export const useConfirmly = () => {
  const { modalState, setModalState, getModalOrder, clearModals } =
    useConfirmlyContext();

  // Function to Show ConfirmBox
  const showConfirm = (description = "", dialogConfig = {}) => {
    try {
      const configData = { ...defaultDialogConfig, ...dialogConfig };
      const {
        title,
        icon,
        actions,
        onConfirm,
        onCancel,
        showIcon,
        ...otherConfigs
      } = configData;
      const dialogTitle = title || Literals.confirm;
      const dialogIcon = icon || dialogTypeWiseIcon.confirm;

      const dialogData = {
        id: genUID(),
        title: dialogTitle,
        description,
        actions: isArray(actions) ? actions : [],
        onConfirm: onConfirm,
        onCancel: onCancel,
        icon: dialogIcon,
        showIcon: showIcon,
        order: getModalOrder(),
        config: otherConfigs,
      };

      setModalState((prevDialogs) => ({
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
  const showAlert = (description = "", dialogConfig = {}) => {
    try {
      const configData = { ...defaultDialogConfig, ...dialogConfig };
      const { title, icon, actions, showIcon, ...otherConfigs } = configData;
      const dialogTitle = title || Literals.alert;
      const dialogIcon = icon || dialogTypeWiseIcon.alert;

      const dialogData = {
        id: genUID(),
        title: dialogTitle,
        description,
        actions: isArray(actions) ? actions : [],
        icon: dialogIcon,
        showIcon: showIcon,
        order: getModalOrder(),
        config: otherConfigs,
      };

      setModalState((prevDialogs) => ({
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
  const showInfo = (description = "", dialogConfig = {}) => {
    try {
      const configData = { ...defaultDialogConfig, ...dialogConfig };
      const { title, icon, actions, showIcon, ...otherConfigs } = configData;
      const dialogTitle = title || Literals.info;
      const dialogIcon = icon || dialogTypeWiseIcon.info;

      const dialogData = {
        id: genUID(),
        title: dialogTitle,
        description,
        actions: isArray(actions) ? actions : [],
        icon: dialogIcon,
        showIcon: showIcon,
        order: getModalOrder(),
        config: otherConfigs,
      };

      setModalState((prevDialogs) => ({
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
