import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Note } from "../../../types/note";
import notesService from "../../../services/notesService";
import NotesList from "../../Notes/NotesList";
import Editor from "../../Notes/Editor";

type NotesProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  token: string;
};

type NotesPageTemplateProps = {
  filter: (note: Note) => boolean;
  onArchiveOrRestore: (id: string) => void;
  infoMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  onNoteCreation?: () => void;
  createOnMount?: boolean;
  selectedNote?: Note | null;
  setSelectedNote?: React.Dispatch<React.SetStateAction<Note | null>>;
};

const NotesPageTemplate = ({
  filter,
  onArchiveOrRestore,
  infoMessage,
  emptyMessage,
  onNoteCreation,
  createOnMount,
  selectedNote: selectedNoteProp,
  setSelectedNote: setSelectedNoteProp,
}: NotesPageTemplateProps) => {
  const { notes, setNotes, token } = useOutletContext<NotesProps>();
  const [selectedNoteInternal, setSelectedNoteInternal] = useState<Note | null>(
    null
  );

  const filteredNotes = notes.filter(filter);

  const selectedNoteState = selectedNoteProp ?? selectedNoteInternal;
  const setSelectedNoteState = setSelectedNoteProp ?? setSelectedNoteInternal;

  const handleNoteCreation = () => {
    const existingNewNote = notes.find((n) => n.isNew);
    if (existingNewNote) {
      setSelectedNoteState(existingNewNote);
      return;
    }
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      tags: [],
      status: "active",
      isNew: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const sidebarNote = { ...newNote, title: "Untitled note" };
    setNotes((prev) => [sidebarNote, ...prev]);
    setSelectedNoteState(sidebarNote);
  };

  const handleSaveNote = async (note: Note) => {
    try {
      const dto = {
        title: note.title,
        content: note.content.replace(/\u200B/g, ""),
        tags: note.tags,
        status: note.status,
      };
      if (!note.title.trim() || !note.content.trim()) return;

      const savedNote = note.isNew
        ? await notesService.createNote(dto, token)
        : await notesService.updateNote(note.id, dto, token);

      if (!savedNote) return;

      const finalNote = { ...savedNote, isNew: false };
      setNotes((prev) => {
        if (note.isNew) {
          return prev.map((n) => (n.id === note.id ? finalNote : n));
        }

        return prev.map((n) => (n.id === finalNote.id ? finalNote : n));
      });

      setSelectedNoteState(finalNote);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleCancelNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNoteState?.id === id) setSelectedNoteState(null);
  };

  const handleDeleteNote = async (id: string) => {
    if (!id) return;
    try {
      await notesService.deleteNote(id, token);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setSelectedNoteState(null);
    } catch (error: any) {
      console.log("Failed to delete note", error.message);
    }
  };

  useEffect(() => {
    if (createOnMount) {
      handleNoteCreation();
    }
  }, [createOnMount]);
  const createHandler = onNoteCreation ?? handleNoteCreation;

  return (
    <div className="flex gap-10">
      <div>
        <NotesList
          notes={filteredNotes}
          handleSelectedNote={setSelectedNoteState}
          selectedNote={selectedNoteState}
          onNoteCreation={createHandler}
          emptyMessage={emptyMessage}
          infoMessage={infoMessage}
        />
      </div>
      {selectedNoteState && (
        <Editor
          selectedNote={selectedNoteState}
          setSelectedNote={setSelectedNoteState}
          onSaveNote={handleSaveNote}
          onDeleteNote={handleDeleteNote}
          onArchiveOrRestore={onArchiveOrRestore}
          handleCancelNote={handleCancelNote}
        />
      )}
    </div>
  );
};

export default NotesPageTemplate;
