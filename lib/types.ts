import React from 'react';
import { ToasterProps } from 'react-hot-toast/dist';

export type ConfirmlyDialogPositions =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {}

export interface ConfirmlyProviderProps {
  disablePortal?: boolean;
  dialogPosition?: ConfirmlyDialogPositions;
  showIcons?: boolean;
  notifyProps?: ToasterProps;
  children: React.ReactNode;
}

export interface DialogActionInterface {
  label: string;
  className?: string;
  icon?: React.ReactNode;
  onClick: (id: string) => void;
  htmlProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export interface DialogActionConfig {
  isShowCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
}

export interface CustomDialogProps {
  className?: string;
  open: boolean;
  title: string;
  actions?: React.ReactNode;
  handleClose: () => void;
  dividers?: boolean;
  dividerTop?: boolean;
  dividerBottom?: boolean;
  dialogActionProps?: React.HTMLAttributes<HTMLDivElement>;
  dialogContentProps?: React.HTMLAttributes<HTMLDivElement>;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  position?: ConfirmlyDialogPositions;
}

export interface ConfirmlyDialogComponentProps {
  modalState: ConfirmlyState['modalState'];
  modalConfig: ConfirmlyState['modalConfig'];
  setModalState: (
    data:
      | ConfirmlyState['modalState']
      | ((prevState: ConfirmlyState['modalState']) => ConfirmlyState['modalState'])
  ) => void;
}

export interface ConfirmlyState {
  modalState: {
    [key: string]: {
      id: string;
      title: string;
      description: string;
      actions: React.ReactNode[];
      onConfirm?: () => void;
      onCancel?: () => void;
      icon: React.ReactNode;
      showIcon: boolean;
      order: number;
      config: any;
      position: ConfirmlyDialogPositions;
    };
  };
  modalConfig: {
    disablePortal?: boolean;
    dialogPosition?: ConfirmlyDialogPositions;
    showIcons?: boolean;
  };
}

export type ConfirmlyAction =
  | { type: 'SET_MODAL_STATE'; payload: ConfirmlyState['modalState'] }
  | { type: 'SET_MODAL_CONFIG'; payload: ConfirmlyState['modalConfig'] }
  | { type: 'CLEAR_MODALS' }
  | { type: 'CLOSE_MODAL'; payload: string };

export interface ConfirmlyContextValue extends ConfirmlyState {
  setModalState: (
    data:
      | ConfirmlyState['modalState']
      | ((prevState: ConfirmlyState['modalState']) => ConfirmlyState['modalState'])
  ) => void;
  clearModals: () => void;
}

export const ModalContext = React.createContext<ConfirmlyContextValue>({
  modalState: {},
  modalConfig: {},
  setModalState: () => {},
  clearModals: () => {},
});
