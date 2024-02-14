const Person = ({ person, handleDeletion }) => {
  const { name, number, id } = person;
  return (
    <div>
      {name} {number}{" "}
      <button onClick={() => handleDeletion(id, name)}>delete</button>
    </div>
  );
};

export default Person;
