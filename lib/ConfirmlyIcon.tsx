import React from "react";
import CloseIcon from "./icons/close.svg";
import SuccessIcon from "./icons/success.svg";
import WarningIcon from "./icons/warning.svg";
import InfoIcon from "./icons/info.svg";
import ConfirmIcon from "./icons/confirm.svg";

interface ConfirmlyIconProps {
  iconName: "close" | "success" | "warning" | "info" | "confirm";
}

export const ConfirmlyIcon = ({ iconName }: ConfirmlyIconProps) => {
  let iconSrc = "";

  switch (iconName) {
    case "close":
      iconSrc = CloseIcon;
      break;
    case "success":
      iconSrc = SuccessIcon;
      break;
    case "warning":
      iconSrc = WarningIcon;
      break;
    case "info":
      iconSrc = InfoIcon;
      break;
    case "confirm":
      iconSrc = ConfirmIcon;
      break;
    default:
      return null; // Return nothing if iconName is invalid
  }

  return <img src={iconSrc} alt={iconName} />;
};
