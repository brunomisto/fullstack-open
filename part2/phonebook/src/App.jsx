import { useState, useEffect } from "react";
import personServices from "./services/person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const notificate = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const logError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const handleDeletion = (id, name) => {
    if (confirm(`delete ${name}?`)) {
      personServices.deleteAsset(id).then(() => {
        const availablePersons = persons.filter((person) => person.id !== id);
        notificate(`Deleted ${name}`);
        setPersons(availablePersons);
      });
    }
  };

  const handleNewPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("Please fill all the form controls");
      return;
    }

    const found = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (found) {
      if (
        confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const replacer = {
          ...found,
          name: newName,
          number: newNumber,
        };

        personServices
          .update(found.id, replacer)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id === found.id ? replacer : person
              )
            );
            notificate(`Edited ${newName} number`);
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            logError(
              `Information of ${newName} has already been removed from server`
            );
            setPersons(
              persons.filter(
                (person) => person.name.toLowerCase() !== newName.toLowerCase()
              )
            );
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personServices.create(newPerson).then((person) => {
      console.log(person);
      setPersons(persons.concat(person));
      notificate(`Added ${newPerson.name}`);
      setNewName("");
      setNewNumber("");
    });
  };

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchName.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Error text={error} />
      <Notification text={notification} />
      <Filter
        name={searchName}
        onChange={(event) => setSearchName(event.target.value)}
      />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onChangeName={(event) => setNewName(event.target.value)}
        onChangeNumber={(event) => setNewNumber(event.target.value)}
        onSubmit={handleNewPerson}
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} handleDeletion={handleDeletion} />
    </div>
  );
};

export default App;
