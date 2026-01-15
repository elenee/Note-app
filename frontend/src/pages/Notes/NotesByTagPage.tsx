import {useOutletContext, useParams } from "react-router-dom";
import type { Note } from "../../types/note";
import NotesPageTemplate from "../../components/Common/Layout/NotesPageTemplate";
import { useEffect, useState } from "react";
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

  const { tagName, noteName } = useParams<{
    tagName: string;
    noteName?: string;
  }>();
  const decodedTag = tagName ? decodeURIComponent(tagName) : "";
  const normalizedTag = decodedTag.trim().toLowerCase();

  const filteredNotes = notes.filter((note: Note) =>
    note.tags?.map((t) => t.toLowerCase()).includes(normalizedTag)
  );

  useEffect(() => {
    if (noteName) {
      const note = notes.find((n) => n.title === decodeURIComponent(noteName));
      setSelectedNote(note || null);
    } else {
      setSelectedNote(null);
    }
  }, [noteName, notes]);

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
        notes={filteredNotes}
        setNotes={setNotes}
        token={token}
        onArchiveOrRestore={handleArchiveOrRestore}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        emptyMessage={
          <p>
            No notes have the tag <strong>{normalizedTag}</strong> yet.
          </p>
        }
        infoMessage={`All notes with the ”Dev” tag are shown here. "${normalizedTag}"`}
      />
    </div>
  );
};

export default NotesByTagPage;
