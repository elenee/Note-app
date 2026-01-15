import { useLocation, useOutletContext } from "react-router-dom";
import type { Note } from "../../types/note";
import { useState } from "react";
import notesService from "../../services/notesService";
import NotesPageTemplate from "../../components/Common/Layout/NotesPageTemplate";
import { showNoteArchivedToast } from "../../components/Common/CustomToast";

type NotesProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  token: string;
};

const AllNotesPage = () => {
  const { notes, setNotes, token } = useOutletContext<NotesProps>();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const location = useLocation();
  const state = location.state as { create?: boolean } | undefined;
  // const activeNotes = notes.filter((note) => note.status === "active");

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
    showNoteArchivedToast();
  };

  return (
    <div>
      <NotesPageTemplate
        notes={notes}
        filter={(note) => note.status === 'active'}
        setNotes={setNotes}
        token={token}
        onArchiveOrRestore={handleArchiveOrRestore}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        createOnMount={state?.create}
        emptyMessage="You don’t have any notes yet. Start a new note to capture your thoughts and ideas."
      />
    </div>
  );
};

export default AllNotesPage;
