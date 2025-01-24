const Filter = ({ search, setSearch }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};

export default Filter;
