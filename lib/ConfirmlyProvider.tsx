import React from 'react';
import ConfirmlyDialogComponent from './ConfirmlyDialogComponent';
import { Toaster } from 'react-hot-toast';
import {
  ConfirmlyAction,
  ConfirmlyProviderProps,
  ConfirmlyState,
  ConfirmlyContextValue,
} from './types';

const initialState: ConfirmlyState = {
  modalState: {},
  modalConfig: {
    disablePortal: false,
    dialogPosition: 'center',
    showIcons: true,
  },
};

export const ModalContext = React.createContext<ConfirmlyContextValue>({
  modalState: {},
  modalConfig: initialState.modalConfig,
  setModalState: () => {},
  clearModals: () => {},
});

// Reducer for Modal State
const confirmlyReducer = (state: ConfirmlyState, action: ConfirmlyAction) => {
  switch (action.type) {
    case 'SET_MODAL_STATE':
      return { ...state, modalState: action.payload };
    case 'SET_MODAL_CONFIG':
      return { ...state, modalConfig: action.payload };
    case 'CLEAR_MODALS':
      return initialState;
    case 'CLOSE_MODAL':
      const { [action.payload]: _, ...rest } = state.modalState;
      return { ...state, modalState: rest };
    default:
      return state;
  }
};

// ConfirmlyProvider
export const ConfirmlyProvider: React.FC<ConfirmlyProviderProps> = ({
  notifyProps = {},
  children,
  ...props
}: ConfirmlyProviderProps) => {
  const [states, dispatch] = React.useReducer<React.Reducer<ConfirmlyState, ConfirmlyAction>>(
    confirmlyReducer,
    {
      ...initialState,
      modalConfig: {
        ...initialState.modalConfig,
        disablePortal: props.disablePortal ?? initialState.modalConfig.disablePortal,
        dialogPosition: props.dialogPosition ?? initialState.modalConfig.dialogPosition,
        showIcons: props.showIcons ?? initialState.modalConfig.showIcons,
      },
    }
  );
  const modalState = states.modalState;
  const modalConfig = states.modalConfig;

  const setModalState = (
    data:
      | ConfirmlyState['modalState']
      | ((prevState: ConfirmlyState['modalState']) => ConfirmlyState['modalState'])
  ) => {
    if (typeof data === 'function') {
      const newState = data(modalState);
      dispatch({ type: 'SET_MODAL_STATE', payload: newState });
    } else {
      dispatch({ type: 'SET_MODAL_STATE', payload: data });
    }
  };

  const clearModals = () => {
    dispatch({ type: 'CLEAR_MODALS' });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        modalConfig,
        setModalState,
        clearModals,
      }}
    >
      <ConfirmlyDialogComponent
        modalConfig={modalConfig}
        modalState={modalState}
        setModalState={setModalState}
      />
      <Toaster {...notifyProps} />
      {children}
    </ModalContext.Provider>
  );
};
