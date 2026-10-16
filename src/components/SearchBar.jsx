
function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search food (e.g., apple, milk, chocolate)"
      aria-label="Search food"
    />
  );
}

export default SearchBar;
