const PersonsList = ({ persons, removePerson }) => {
  return (
    <div>
      {persons.map((person, idx) => (
        <div key={idx}>
          {person.name} {person.number}{" "}
          <button onClick={() => removePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default PersonsList;
