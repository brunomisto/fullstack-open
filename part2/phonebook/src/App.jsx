import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

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
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
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
      <Filter name={searchName} handleNameChange={handleSearchNameChange} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleName={handleNewNameChange}
        handleNumber={handleNewNumberChange}
        handleNewPerson={handleNewPerson}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} />
    </div>
  );
};

export default App;
