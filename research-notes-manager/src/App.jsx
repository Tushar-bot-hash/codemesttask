import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import TagFilter from "./components/TagFilter";

// Using the VITE_ prefix so the environment variables are accessible
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [notes, setNotes] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      // Build the query
      let query = supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filter if a tag is selected
      if (activeTag) {
        query = query.eq('tag', activeTag);
      }

      const { data, error } = await query;

      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      console.error("Failed to fetch notes:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [activeTag]);

  const addNote = async (note) => {
    try {
      const { error } = await supabase
        .from('notes')
        .insert([note]);
        
      if (error) throw error;
      fetchNotes(); // Refresh the list
    } catch (err) {
      console.error("Failed to add note:", err.message);
    }
  };

  const allTags = [...new Set(notes.map((n) => n.tag).filter(Boolean))];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#0a0a0f", color: "#e8e6f0" }}>
      <div style={{ borderBottom: "1px solid #1e1e2e", padding: "2rem 0", marginBottom: "3rem" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, #7c6aff, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>📋</div>
            <div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#fff" }}>
                Research Notes
              </h1>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b6b8a" }}>Capture · Organize · Filter</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 2rem 4rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { label: "Total Notes", value: notes.length },
            { label: "Tags Used", value: allTags.length },
            { label: "Showing", value: notes.length },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, background: "#13131f", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "1rem 1.25rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "'Syne', sans-serif", color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: "0.72rem", color: "#6b6b8a", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <NoteForm onAdd={addNote} />
        <TagFilter tags={allTags} activeTag={activeTag} onFilter={setActiveTag} />

        <div style={{ marginTop: "2rem" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "#6b6b8a" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⟳</div>
              Loading notes...
            </div>
          ) : (
            <NoteList notes={notes} />
          )}
        </div>
      </div>
    </div>
  );
}