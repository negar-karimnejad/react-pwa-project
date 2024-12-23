import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
