const Filter = ({ name, handleName }) => {
  return (
    <div>
      filter shown with <input value={name} onChange={handleName} />
    </div>
  );
};

export default Filter;
