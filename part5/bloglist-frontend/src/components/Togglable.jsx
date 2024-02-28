import { useState } from "react";

const Togglable = ({ label, children }) => {
  const [visible, setVisible] = useState(false);

  if (visible) {
    return (
      <div>
        {children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setVisible(true)}>{label}</button>
    </div>
  )
}

export default Togglable;