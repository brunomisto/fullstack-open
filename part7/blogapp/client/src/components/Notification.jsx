import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector(({ notification }) => notification);

  if (notification === null) {
    return null;
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
}

export default Notification;
