const Notification = ({ text }) => {
  if (text) {
    return <div className="notification">{text}</div>;
  }
};

export default Notification;
