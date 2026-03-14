import { useState } from "react";

export default function NoteForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", tag: "" });
  const [focused, setFocused] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd(form);
    setForm({ title: "", description: "", tag: "" });
  };

  const inputStyle = (name) => ({
    width: "100%",
    background: "#0d0d1a",
    border: `1px solid ${focused === name ? "#7c6aff" : "#1e1e2e"}`,
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    color: "#e8e6f0",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  });

  return (
    <form onSubmit={handleSubmit} style={{ background: "#13131f", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#7c6aff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
        + New Note
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <input
          name="title" placeholder="Title *" value={form.title}
          onChange={handleChange}
          onFocus={() => setFocused("title")} onBlur={() => setFocused("")}
          style={inputStyle("title")} required
        />
        <input
          name="tag" placeholder="Tag  (e.g. AI, Science)" value={form.tag}
          onChange={handleChange}
          onFocus={() => setFocused("tag")} onBlur={() => setFocused("")}
          style={inputStyle("tag")}
        />
      </div>
      <textarea
        name="description" placeholder="Description..." value={form.description}
        onChange={handleChange}
        onFocus={() => setFocused("desc")} onBlur={() => setFocused("")}
        rows={3}
        style={{ ...inputStyle("desc"), resize: "vertical", marginBottom: "0.75rem" }}
      />
      <button type="submit" style={{ background: "linear-gradient(135deg, #7c6aff, #a78bfa)", border: "none", borderRadius: "10px", padding: "0.7rem 1.5rem", color: "#fff", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
        Add Note →
      </button>
    </form>
  );
}