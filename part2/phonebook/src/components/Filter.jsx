const Filter = ({ name, handleNameChange }) => {
  return (
    <div>
      filter shown with <input value={name} onChange={handleNameChange} />
    </div>
  );
};

export default Filter;
