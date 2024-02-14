import Person from "./Person";

const PersonList = ({ persons, handleDeletion }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDeletion={handleDeletion}
        />
      ))}
    </div>
  );
};

export default PersonList;
