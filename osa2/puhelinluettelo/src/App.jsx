import { useEffect, useState } from "react";
import Filter from "./Filter";
import AddForm from "./AddForm";
import PersonsList from "./PersonsList";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const showNotifMessage = (message) => {
    setNotifMessage(message);
    setTimeout(() => {
      setNotifMessage(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      showErrorMessage("Name or number is missing");
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            console.log("promise fulfilled", response);
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response.data
              )
            );
            setNewName("");
            setNewNumber("");
            showNotifMessage(`Updated ${newName}`);
          })
          .catch((error) => {
            showErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };

      personService.create(person).then((response) => {
        console.log("promise fulfilled", response);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        showNotifMessage(`Added ${newName}`);
      });
    }
  };

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null;
    }
    return <div className={type}>{message}</div>;
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotifMessage(`Deleted ${person.name}`);
        })
        .catch((error) => {
          showErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
        });
    }
  };

  const showPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook:</h1>
      <Notification message={notifMessage} type="notif" />
      <Notification message={errorMessage} type="error" />
      <Filter search={search} setSearch={setSearch} />

      <h2>Add a new one:</h2>
      <AddForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers:</h2>
      <PersonsList persons={showPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
