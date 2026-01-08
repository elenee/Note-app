import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import type { Note } from "../../types/note";
import NotesPageTemplate from "../../components/Common/Layout/NotesPageTemplate";
import { useState } from "react";
import notesService from "../../services/notesService";
import {
  showNoteArchivedToast,
  showNoteRestoredToast,
} from "../../components/Common/CustomToast";

type NotesProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  token: string;
};

const NotesByTagPage = () => {
  const { notes, setNotes, token } = useOutletContext<NotesProps>();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as { create?: boolean } | undefined;

  const pathname = location.pathname;
  const tagName = pathname.split("/tags/")[1];
  const tag = decodeURIComponent(tagName);

  const handleCreateNote = () => {
    navigate("/notes", { state: { create: true } });
  };

  const handleArchiveOrRestore = async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    const updatedStatus = note.status === "active" ? "archived" : "active";

    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: updatedStatus } : n))
    );

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

    setSelectedNote(null);

    updatedStatus === "active"
      ? showNoteRestoredToast()
      : showNoteArchivedToast();
  };

  return (
    <div>
      <NotesPageTemplate
        filter={(note) => note.tags.includes(tag)}
        onArchiveOrRestore={handleArchiveOrRestore}
        onNoteCreation={handleCreateNote}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        createOnMount={state?.create}
        emptyMessage={
          <p>
            No notes have the tag <strong>{tag}</strong> yet.
          </p>
        }
        infoMessage={`All notes with the ”Dev” tag are shown here. "${tag}"`}
      />
    </div>
  );
};

export default NotesByTagPage;
