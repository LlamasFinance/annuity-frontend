import { useNotification } from "web3uikit";
import { TIconType } from "web3uikit/dist/components/Icon/collection";
import {
  notifyType,
  IPosition,
} from "web3uikit/dist/components/Notification/types";

export const useAlert = () => {
  const dispatch = useNotification();

  type AlertProps = {
    type: notifyType;
    message?: string;
    icon?: TIconType;
    position?: IPosition;
  };

  const newAlert = ({ type, message, icon, position }: AlertProps) => {
    console.log(`Alert message - ${message}`);
    dispatch({
      type,
      message: " " + message,
      title: type == "success" ? "Success" : "Error",
      icon,
      position: position || "bottomL",
    });
  };

  return { newAlert };
};

/**
 * References:
 * useNotification - https://github.com/web3ui/web3uikit#notification
 */
