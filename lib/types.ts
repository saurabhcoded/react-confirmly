import React from 'react';

export type ConfirmlyDialogPositions =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {}

export interface ConfirmlyProviderProps {
  disablePortal: boolean;
  dialogPosition: ConfirmlyDialogPositions;
  showIcons: boolean;
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
}
