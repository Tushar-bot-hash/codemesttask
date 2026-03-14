export default function TagFilter({ tags, activeTag, onFilter }) {
  if (tags.length === 0) return null;

  const btnStyle = (active) => ({
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    fontSize: "0.78rem",
    fontWeight: 500,
    cursor: "pointer",
    border: active ? "1px solid #7c6aff" : "1px solid #1e1e2e",
    background: active ? "#1e1a3a" : "transparent",
    color: active ? "#a78bfa" : "#6b6b8a",
    transition: "all 0.15s",
    fontFamily: "'DM Sans', sans-serif",
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", padding: "1rem 0" }}>
      <button style={btnStyle(!activeTag)} onClick={() => onFilter("")}>All</button>
      {tags.map((tag) => (
        <button key={tag} style={btnStyle(activeTag === tag)} onClick={() => onFilter(tag)}>{tag}</button>
      ))}
    </div>
  );
}