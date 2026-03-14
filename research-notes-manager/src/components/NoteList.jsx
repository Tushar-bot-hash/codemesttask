import NoteCard from "./NoteCard";

export default function NoteList({ notes }) {
  if (notes.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#3d3d5c" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🗒</div>
        <div style={{ fontSize: "0.9rem" }}>No notes yet — add one above!</div>
      </div>
    );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
      {notes.map((note) => <NoteCard key={note.id} note={note} />)}
    </div>
  );
}