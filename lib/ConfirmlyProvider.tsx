import React from "react";
import ConfirmlyDialogComponent from "./ConfirmlyDialogComponent";
import { Toaster } from "react-hot-toast";

export const ModalContext = React.createContext();
const initialState = {};

// Reducer for Modal State
const confirmlyReducer = (state, action) => {
  switch (action.type) {
    case "SET_MODAL_STATE":
      return action.payload;
    case "CLEAR_MODALS":
      return {};
    case "CLOSE_MODAL":
      const { [action.payload]: _, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

// ConfirmlyProvider
export const ConfirmlyProvider = ({ notifyProps = {}, children }) => {
  const [modalState, dispatch] = React.useReducer(
    confirmlyReducer,
    initialState
  );

  const setModalState = (data) => {
    if (typeof data === "function") {
      const newState = data(modalState);
      dispatch({ type: "SET_MODAL_STATE", payload: newState });
    } else {
      dispatch({ type: "SET_MODAL_STATE", payload: data });
    }
  };

  const clearModals = () => {
    dispatch({ type: "CLEAR_MODALS" });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        setModalState,
        clearModals,
      }}
    >
      <ConfirmlyDialogComponent
        modalState={modalState}
        setModalState={setModalState}
      />
      <Toaster {...notifyProps} />
      {children}
    </ModalContext.Provider>
  );
};
