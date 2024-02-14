import { useState, useEffect } from "react";
import personServices from "./services/person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personServices.getAll().then((persons) => {
      console.log(persons);
      setPersons(persons);
    });
  }, []);

  const handleDeletion = (id, name) => {
    if (confirm(`delete ${name}?`)) {
      personServices.deleteAsset(id).then((deleted) => {
        const availablePersons = persons.filter(
          (person) => person.id !== deleted.id
        );
        setPersons(availablePersons);
      });
    }
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("Please fill all the form controls");
      return;
    }

    const personsNames = persons.map((person) => person.name);
    if (personsNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personServices.create(newPerson).then((person) => {
      console.log(person);
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchName.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={searchName} handleName={handleSearchNameChange} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleName={handleNewNameChange}
        handleNumber={handleNewNumberChange}
        handleNewPerson={handleNewPerson}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} handleDeletion={handleDeletion} />
    </div>
  );
};

export default App;
