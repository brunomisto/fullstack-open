import { useSelector } from "react-redux";
import classNames from "classnames";

function Notification() {
  const notification = useSelector(({ notification }) => notification);

  if (notification === null) {
    return null;
  }

  const typeClasses = classNames({
    "text-lime-600 border-lime-600": notification.type === "info",
    "text-red-600 border-red-600": notification.type === "error",
  });

  return (
    <div
      className={`text-xl border-2 rounded-md p-3 bg-slate-300 my-3 ${typeClasses}`}
    >
      {notification.message}
    </div>
  );
}

export default Notification;
