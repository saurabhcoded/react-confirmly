import { create } from 'zustand';
import ConfirmlyDialogComponent from './ConfirmlyDialogComponent';
import { Toaster } from 'react-hot-toast';
import { ConfirmlyAction, ConfirmlyProviderProps, ConfirmlyState } from './types';

// Initial State
const initialState: ConfirmlyState = {
  modalState: {},
  modalConfig: {
    disablePortal: false,
    dialogPosition: 'center',
    showIcons: true,
  },
};

// Zustand Store
export const useConfirmlyStore = create<
  ConfirmlyState & {
    setModalState: (
      state:
        | ConfirmlyState['modalState']
        | ((prev: ConfirmlyState['modalState']) => ConfirmlyState['modalState'])
    ) => void;
    setModalConfig: (config: ConfirmlyState['modalConfig']) => void;
    clearModals: () => void;
    closeModal: (key: string) => void;
  }
>(set => ({
  ...initialState,

  setModalState: data =>
    set(state => ({
      modalState: typeof data === 'function' ? data(state.modalState) : data,
    })),

  setModalConfig: config => set(() => ({ modalConfig: config })),

  clearModals: () => set(() => initialState),

  closeModal: key =>
    set(state => {
      const { [key]: _, ...rest } = state.modalState;
      return { modalState: rest };
    }),
}));

// ConfirmlyProvider Component (Wraps UI but No Context Needed)
export const ConfirmlyProvider: React.FC<ConfirmlyProviderProps> = ({
  notifyProps = {},
  children,
  ...props
}) => {
  const { modalState, modalConfig, setModalState } = useConfirmlyStore();

  return (
    <>
      <ConfirmlyDialogComponent
        modalConfig={modalConfig}
        modalState={modalState}
        setModalState={setModalState}
      />
      <Toaster {...notifyProps} />
      {children}
    </>
  );
};

// ✅ Functions to Manage State from Anywhere
export const updateContext = (newValue: Partial<ConfirmlyState>) => {
  useConfirmlyStore.setState(newValue);
};

export const getContext = () => {
  return useConfirmlyStore.getState();
};
