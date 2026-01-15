import { useCallback, useEffect, useRef, useState } from "react";
import type { Note } from "../../../types/note";
import notesService from "../../../services/notesService";
import NotesList from "../../Notes/NotesList";
import Editor from "../../Notes/Editor";
import {
  showNoteDeletedToast,
  showNoteSavedToast,
  showNoteUpdatedToast,
} from "../CustomToast";
import ConfirmModal from "../ConfirmModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArchiveIcon, DeleteIcon } from "../../../Icons/Icons";

type NotesPageTemplateProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  filter?: (note: Note) => boolean;
  token?: string;
  onArchiveOrRestore: (id: string) => void;
  infoMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  onNoteCreation?: () => void;
  createOnMount?: boolean;
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
};

const NotesPageTemplate = ({
  notes,
  filter,
  setNotes,
  token,
  onArchiveOrRestore,
  infoMessage,
  emptyMessage,
  selectedNote,
  setSelectedNote,
}: NotesPageTemplateProps) => {
  const [modalType, setModalType] = useState<"delete" | "archive" | null>(null);
  const [modalNoteId, setModalNoteId] = useState<string | null>(null);
  const prevTagsRef = useRef<string[]>(selectedNote?.tags ?? []);

  const visibleNotes = filter ? notes.filter(filter) : notes;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.create) {
      handleNoteCreation();
      navigate(".", { replace: true, state: {} });
    }
  }, []);

  const handleNoteCreation = useCallback(() => {
    console.log("inside handleNoteCreation");
    const existingNewNote = notes.find((n) => n.isNew);

    if (existingNewNote) {
      setSelectedNote(existingNewNote);
      return;
    }

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      tags: [],
      status: "active",
      isNew: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sidebarNote = { ...newNote };

    setNotes((prev) => [sidebarNote, ...prev]);
    setSelectedNote(sidebarNote);
  }, [notes, setSelectedNote, setNotes]);

  const handleSaveNote = async (note: Note) => {
    if (!token) {
      console.warn("No token, skipping save");
      return;
    }
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
      prevTagsRef.current = selectedNote?.tags ?? [];

      setSelectedNote(finalNote);

      if (note.isNew) {
        showNoteSavedToast();
      } else {
        showNoteUpdatedToast();
      }
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleCancelNote = (id: string) => {
    const note = notes.find((n) => n.id == id);
    if (!note) return;
    if (note.isNew) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const handleDeleteNote = async (id: string) => {
    if (!token) {
      console.log("!token");
      return;
    }
    if (!id) {
      return;
    }
    try {
      await notesService.deleteNote(id, token);
      console.log("delete");
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setSelectedNote(null);
      showNoteDeletedToast();
    } catch (error: any) {
      console.log("Failed to delete note", error.message);
    }
  };

  const openDeleteModal = (id: string) => {
    setModalNoteId(id);
    setModalType("delete");
  };

  const handleConfirmModal = async () => {
    if (!modalNoteId || !modalType) return;

    if (modalType === "delete") {
      await handleDeleteNote(modalNoteId);
    } else if (modalType === "archive") {
      onArchiveOrRestore(modalNoteId);
    }

    setModalType(null);
    setModalNoteId(null);
  };

  const handleCancelModal = () => {
    setModalType(null);
    setModalNoteId(null);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);

    if (location.pathname.startsWith("/tags/")) {
      const { tagName } = useParams<{ tagName: string }>();
      if (!tagName) return;

      const tagBase = `/tags/${encodeURIComponent(tagName)}`;
      navigate(`${tagBase}/${encodeURIComponent(note.title)}`, {
        replace: true,
      });
    } else if (location.pathname.startsWith("/archived-notes")) {
      navigate(`/archived-notes/${encodeURIComponent(note.title)}`, {
        replace: true,
      });
    } else if (location.pathname.startsWith("/search")) {
      navigate(`/search/${encodeURIComponent(note.title)}`, { replace: true });
    } else {
      navigate(`/notes/${encodeURIComponent(note.title)}`, { replace: true });
    }
  };

  return (
    <div className="flex">
      <div>
        <NotesList
          notes={visibleNotes}
          handleSelectedNote={handleNoteClick}
          selectedNote={selectedNote}
          onNoteCreation={handleNoteCreation}
          emptyMessage={emptyMessage}
          infoMessage={infoMessage}
        />
      </div>
      {selectedNote && (
        <Editor
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          onSaveNote={handleSaveNote}
          onDeleteNote={(id) => openDeleteModal(id)}
          onArchive={(id) => {
            setModalNoteId(id);
            setModalType("archive");
          }}
          onRestore={(id) => onArchiveOrRestore(id)}
          handleCancelNote={handleCancelNote}
        />
      )}

      {modalType && modalNoteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[hsla(222,32%,8%,1)]/12 backdrop-blur-xs" />

          <div>
            <ConfirmModal
              isOpen
              isDelete={modalType === "delete"}
              title={modalType === "delete" ? "Delete Note?" : "Archive Note?"}
              description={
                modalType === "delete"
                  ? "This action cannot be undone."
                  : "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
              }
              confirmText={modalType === "delete" ? "Delete" : "Archive"}
              icon={modalType === "delete" ? <DeleteIcon /> : <ArchiveIcon />}
              onConfirm={handleConfirmModal}
              onCancel={handleCancelModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPageTemplate;
