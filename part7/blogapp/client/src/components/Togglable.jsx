import PropTypes from "prop-types";
import { useState } from "react";

function Togglable({ label, children }) {
  const [visible, setVisible] = useState(false);

  if (visible) {
    return (
      <div>
        {children}
        <button
          onClick={() => setVisible(false)}
          className="border border-slate-400 p-2 rounded-lg bg-red-200 hover:bg-red-400"
        >
          cancel
        </button>
      </div>
    );
  }

  return (
    <button
      className="border border-slate-400 p-2 rounded-lg hover:bg-green-200"
      onClick={() => setVisible(true)}
    >
      {label}
    </button>
  );
}

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Togglable;
