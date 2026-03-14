const tagColors = {
  default: { bg: "#1a1a2e", text: "#a78bfa" },
  AI: { bg: "#1a1f2e", text: "#60a5fa" },
  Science: { bg: "#1a2e1e", text: "#4ade80" },
  Research: { bg: "#2e1a1a", text: "#f87171" },
};

export default function NoteCard({ note }) {
  const color = tagColors[note.tag] || tagColors.default;
  const date = note.created_at
    ? new Date(note.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "";

  return (
    <div style={{ background: "#13131f", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", transition: "border-color 0.2s", cursor: "default" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#7c6aff"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e2e"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
        <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, fontFamily: "'Syne', sans-serif", color: "#fff", lineHeight: 1.3 }}>{note.title}</h3>
        {note.tag && (
          <span style={{ background: color.bg, color: color.text, fontSize: "0.7rem", padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap", fontWeight: 500 }}>
            {note.tag}
          </span>
        )}
      </div>
      {note.description && (
        <p style={{ margin: 0, fontSize: "0.82rem", color: "#8888a8", lineHeight: 1.6 }}>{note.description}</p>
      )}
      {date && <div style={{ fontSize: "0.7rem", color: "#3d3d5c", marginTop: "auto" }}>{date}</div>}
    </div>
  );
}