import { useNavigate, useOutletContext } from "react-router-dom";
import type { Note } from "../../types/note";
import notesService from "../../services/notesService";
import NotesPageTemplate from "../../components/Common/Layout/NotesPageTemplate";
import { useState } from "react";
import { showNoteRestoredToast } from "../../components/Common/CustomToast";

type NotesProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  token: string;
};

const ArchivedNotesPage = () => {
  const { notes, setNotes, token } = useOutletContext<NotesProps>();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/notes", { state: { create: true } });
  };

  const handleArchiveOrRestore = async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    const updatedStatus = note.status === "archived" ? "active" : "active";

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
    showNoteRestoredToast()
  };

  return (
    <div>
      <NotesPageTemplate
        filter={(note) => note.status === "archived"}
        onArchiveOrRestore={handleArchiveOrRestore}
        onNoteCreation={handleCreateNote}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        infoMessage="All your archived notes are stored here. You can restore or delete them anytime."
        emptyMessage={
          <>
            No notes have been archived yet. Move notes here for safekeeping, or{" "}
            <span
              onClick={handleCreateNote}
              className="underline cursor-pointer"
            >
              create a new note
            </span>
            .
          </>
        }
      />
    </div>
  );
};

export default ArchivedNotesPage;
