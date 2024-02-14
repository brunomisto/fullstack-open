const Error = ({ text }) => {
  if (text) {
    return <div className="error">{text}</div>;
  }
};

export default Error;
