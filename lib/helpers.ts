import { ConfirmlyState, dialogType, dialogTypeWiseIcon, DialogConfig } from './types';
import React from 'react';

export function isFunction(input: unknown): input is Function {
  return typeof input === 'function';
}

export function genUID(length: number = 8): string {
  return `_${Math.random()
    .toString(36)
    .substring(2, 2 + length)}`;
}

export function isArray(input: unknown): boolean {
  return Array.isArray(input);
}

export const Literals = Object.freeze({
  ok: 'Ok',
  cancel: 'Cancel',
  confirm: 'Confirm',
  alert: 'Alert',
  info: 'Info',
});

export const createConfirmly = (
  dialogType: dialogType,
  configData: DialogConfig,
  globalConfig: ConfirmlyState['modalConfig'],
  IconsLibrary: dialogTypeWiseIcon
) => {
  const {
    title,
    icon,
    actions = [],
    onConfirm,
    onCancel,
    showIcon,
    position,
    order = 1,
    ...otherConfigs
  } = configData;
  if (!['confirm', 'alert', 'info'].includes(dialogType)) {
    throw new Error('Invalid dialog type. Must be one of: confirm, alert, info');
  }
  const dialogTitle = title || Literals?.[dialogType];
  const dialogIcon = icon || IconsLibrary?.[dialogType];
  const dialogPosition = position || globalConfig?.dialogPosition || 'center';
  const dialogShowIcon = showIcon ? showIcon : globalConfig?.showIcons || true;
  const dialogData = {
    id: genUID(),
    title: dialogTitle,
    description: configData.description ?? '',
    actions: isArray(actions) ? actions : [],
    onConfirm: onConfirm,
    onCancel: onCancel,
    icon: dialogIcon,
    showIcon: dialogShowIcon,
    order: order,
    position: dialogPosition,
    config: otherConfigs,
  };

  return dialogData;
};

export const defaultDialogConfig: DialogConfig = {
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
