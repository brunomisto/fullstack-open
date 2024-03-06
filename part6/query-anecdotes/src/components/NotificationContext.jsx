import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "NOTIFICATE":
        return action.payload;
      case "CLEAR_NOTIFICATION":
        return null;
      default:
        return state;
    }
  };

  const [notification, dispathNotification] = useReducer(notificationReducer);

  return (
    <NotificationContext.Provider value={[notification, dispathNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  // Why? idk
  children: PropTypes.object,
};

export default NotificationContext;
