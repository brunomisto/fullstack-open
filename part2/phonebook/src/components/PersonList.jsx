import Person from "./Person";

const PersonList = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default PersonList;
