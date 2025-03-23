import React from 'react';
import ReactDOM from 'react-dom';
import { isFunction, Literals } from './helpers';
import { ConfirmlyIcon } from './ConfirmlyIcon';
import './styles/confirmly.css';
import { CustomDialogProps, DialogActionConfig, DialogActionInterface } from './types';
import { ConfirmlyDialogComponentProps } from './types';

const ConfirmlyDialogComponent = React.memo(
  ({ modalState, modalConfig, setModalState }: ConfirmlyDialogComponentProps) => {
    const ModalsArray = React.useMemo(() => Object.entries(modalState), [modalState]);
    console.log('ModalsArray', ModalsArray);
    const handleClose = React.useCallback(
      (modalKey: string) => () => {
        try {
          setModalState(prevDialogs => {
            return Object.fromEntries(
              Object.entries(prevDialogs).filter(([entryKey, entryVal]) => entryKey !== modalKey)
            );
          });
        } catch (err) {
          console.error(err);
        }
      },
      [setModalState]
    );

    const handleActionClick = (action: DialogActionInterface, modalKey: string) => () => {
      try {
        if (isFunction(action?.onClick)) {
          action?.onClick(modalKey);
        }
        handleClose(modalKey)();
      } catch (err) {
        console.error(err);
      }
    };

    const getDialogActions = (
      modalKey: string,
      actionData: DialogActionInterface[],
      handleConfirm?: () => void,
      handleCancel?: () => void,
      actionConfig: DialogActionConfig = {}
    ) => {
      const { isShowCancel, confirmText: _confirmText, cancelText: _cancelText } = actionConfig;
      if (Array.isArray(actionData) && actionData.length > 0) {
        return actionData.map((act, actIndex) => {
          let actBtnProps = { className: 'confirmly-btn' };
          if (act?.htmlProps) actBtnProps = { ...actBtnProps, ...act?.htmlProps };
          return (
            <button key={actIndex} {...actBtnProps} onClick={handleActionClick(act, modalKey)}>
              {act?.label}
            </button>
          );
        });
      } else {
        let dActions: React.ReactNode[] = [];
        if (isFunction(handleConfirm) || isFunction(handleCancel)) {
          dActions = [
            <button
              className="confirmly-btn"
              key={'action-1'}
              onClick={() => {
                if (isFunction(handleConfirm)) {
                  handleConfirm();
                }
                handleClose(modalKey)();
              }}
            >
              {_confirmText || Literals.ok}
            </button>,
          ];
          if (isShowCancel)
            dActions = dActions.concat(
              <button
                key={'action-2'}
                className="confirmly-btn"
                onClick={() => {
                  if (isFunction(handleCancel)) {
                    handleCancel();
                  }
                  handleClose(modalKey)();
                }}
              >
                {_cancelText || Literals?.cancel}
              </button>
            );
        } else {
          dActions = [
            <button key={'action-1'} className="confirmly-btn" onClick={handleClose(modalKey)}>
              {_confirmText || Literals.ok}
            </button>,
          ];
        }

        return dActions;
      }
    };
    const modalComponent = (
      <>
        {Array.isArray(ModalsArray) &&
          ModalsArray.map(([modalKey, modalData]) => {
            let modalConfig = modalData?.config;
            let DialogActions = getDialogActions(
              modalKey,
              modalData?.actions as unknown as DialogActionInterface[],
              modalData?.onConfirm,
              modalData?.onCancel,
              {
                isShowCancel: isFunction(modalData?.onCancel),
                confirmText: modalConfig?.confirmText,
                cancelText: modalConfig?.cancelText,
              }
            );
            let IS_HTMLCONTENT = modalConfig?.html === true;
            let dialogTitle = modalData?.title;
            let modalIcon = modalData?.icon;
            return (
              <CustomDialog
                key={modalKey}
                className={'confirmly-modal'}
                open={true}
                title={dialogTitle}
                actions={DialogActions}
                handleClose={handleClose(modalKey)}
                dividers={modalConfig?.divider}
                dividerTop={modalConfig?.dividerTop}
                dividerBottom={modalConfig?.dividerBottom}
                dialogActionProps={{
                  style: {
                    justifyContent: modalData?.config?.actionsAlign ?? 'center',
                  },
                }}
                dialogContentProps={{}}
                headerActions={
                  <button
                    className="confirmly-btn icon-btn close-icon"
                    onClick={handleClose(modalKey)}
                  >
                    <ConfirmlyIcon iconName={'close'} />
                  </button>
                }
                position={modalData?.position}
              >
                {
                  <div className="confirmly-modal-content-wrapper">
                    {modalData?.showIcon && (
                      <span className="confirmly-modal-icon">{modalIcon}</span>
                    )}
                    <div className="confirmly-modal-content">
                      {IS_HTMLCONTENT ? (
                        renderHTML(modalData?.description)
                      ) : (
                        <p className="confirmly-modal-typography">{modalData?.description}</p>
                      )}
                    </div>
                  </div>
                }
              </CustomDialog>
            );
          })}
      </>
    );

    return modalConfig?.disablePortal
      ? modalComponent
      : ReactDOM.createPortal(modalComponent, document.body);
  }
);

export default ConfirmlyDialogComponent;

function renderHTML(input: string): JSX.Element {
  return <div dangerouslySetInnerHTML={{ __html: input }} />;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  className = '',
  open,
  title,
  actions,
  handleClose,
  dividers,
  dividerTop = true,
  dividerBottom = false,
  dialogActionProps,
  dialogContentProps,
  headerActions,
  children,
  position,
}) => {
  if (!open) return null;
  let modalClassname = `confirmly-modal ${className} ${position}`;
  return (
    <div className="confirmly-modal-wrapper">
      <div className={modalClassname}>
        <div className="modal-header">
          <h2 className="typography">{title}</h2>
          {headerActions && <div className="header-actions">{headerActions}</div>}
        </div>

        {(dividers || dividerTop) && <div className="divider" />}

        <div className="modal-content" {...dialogContentProps}>
          {children}
        </div>

        {(dividers || dividerBottom) && <div className="divider" />}

        <div className="modal-actions" {...dialogActionProps}>
          {actions}
        </div>
      </div>
    </div>
  );
};
