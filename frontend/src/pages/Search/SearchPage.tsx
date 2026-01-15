import { useOutletContext, useSearchParams } from "react-router-dom";
import type { Note } from "../../types/note";
import NotesPageTemplate from "../../components/Common/Layout/NotesPageTemplate";
import { useState } from "react";
import notesService from "../../services/notesService";
import {
  showNoteArchivedToast,
  showNoteRestoredToast,
} from "../../components/Common/CustomToast";

type OutletContextType = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  token: string;
};

const SearchPage = () => {
  const { notes, setNotes, token } = useOutletContext<OutletContextType>();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchParms] = useSearchParams();
  const query = (searchParms.get("q") ?? "").toLowerCase();

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const handleArchiveOrRestore = async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    const updatedStatus = note.status === "active" ? "archived" : "active";

    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: updatedStatus } : n))
    );

    setSelectedNote(null);

    await notesService.updateNote(
      id,
      {
        title: note.title,
        content: note.content,
        tags: note.tags,
        status: updatedStatus,
      },
      token
    );

    if (note.status === "active") {
      showNoteArchivedToast();
    } else {
      showNoteRestoredToast();
    }
  };

  return (
    <NotesPageTemplate
      notes={filteredNotes}
      setNotes={setNotes}
      token={token}
      onArchiveOrRestore={handleArchiveOrRestore}
      selectedNote={selectedNote}
      setSelectedNote={setSelectedNote}
      emptyMessage={<div>No results for "{query}"</div>}
      infoMessage={filteredNotes.length ? null : <div>Try another search</div>}
    />
  );
};

export default SearchPage;
