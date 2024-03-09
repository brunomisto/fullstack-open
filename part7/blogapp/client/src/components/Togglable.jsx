import PropTypes from 'prop-types';
import { useState } from 'react';

function Togglable({ label, children }) {
  const [visible, setVisible] = useState(false);

  if (visible) {
    return (
      <div>
        {children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setVisible(true)}>{label}</button>
    </div>
  );
}

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Togglable;
