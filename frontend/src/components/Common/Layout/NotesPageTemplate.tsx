import { useEffect, useRef, useState } from "react";
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

const DeleteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3767 3.10322L13.0586 4.53105H15.2581C15.9343 4.53105 16.4826 5.05735 16.4826 5.70658V6.57714C16.4826 7.02103 16.1077 7.38087 15.6454 7.38087H4.17056C3.70818 7.38087 3.33334 7.02103 3.33334 6.57714V5.70658C3.33334 5.05735 3.88158 4.53105 4.55787 4.53105H6.75739L7.43922 3.10322C7.6438 2.67474 8.0898 2.40002 8.5808 2.40002H11.2351C11.7261 2.40002 12.1721 2.67474 12.3767 3.10322Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.2 7.44061V14.3892C15.2 15.7209 14.0895 16.8004 12.7195 16.8004H7.09717C5.72725 16.8004 4.6167 15.7209 4.6167 14.3892V7.44061"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.49936 10.2531V13.8598M11.3164 10.2531V13.8598"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ArchiveIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 6.48513V13.5141C17.5 15.9708 15.7657 17.5 13.3113 17.5H6.68865C4.23432 17.5 2.5 15.9708 2.5 13.5133V6.48513C2.5 4.02837 4.23432 2.5 6.68865 2.5H13.3113C15.7657 2.5 17.5 4.03567 17.5 6.48513Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.5 11.6667L9.9985 14.1667L7.5 11.6667"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.99829 14.1666V8.33331"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.4447 5.83331H2.54883"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

type NotesPageTemplateProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  token?: string;
  onArchiveOrRestore: (id: string) => void;
  infoMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  onNoteCreation?: () => void;
  createOnMount?: boolean;
  selectedNote?: Note | null;
  setSelectedNote?: React.Dispatch<React.SetStateAction<Note | null>>;
};

const NotesPageTemplate = ({
  notes,
  setNotes,
  token,
  onArchiveOrRestore,
  infoMessage,
  emptyMessage,
  onNoteCreation,
  createOnMount,
  selectedNote: selectedNoteProp,
  setSelectedNote: setSelectedNoteProp,
}: NotesPageTemplateProps) => {
  const [selectedNoteInternal, setSelectedNoteInternal] = useState<Note | null>(
    null
  );
  const [modalType, setModalType] = useState<"delete" | "archive" | null>(null);
  const [modalNoteId, setModalNoteId] = useState<string | null>(null);
  const prevTagsRef = useRef<string[]>(selectedNoteInternal?.tags ?? []);

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
      prevTagsRef.current = selectedNoteInternal?.tags ?? [];

      setSelectedNoteState(finalNote);

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
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNoteState?.id === id) setSelectedNoteState(null);
  };

  const handleDeleteNote = async (id: string) => {
    if (!token) {
      console.warn("No token, skipping save");
      return;
    }
    if (!id) return;
    try {
      await notesService.deleteNote(id, token);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setSelectedNoteState(null);
      showNoteDeletedToast();
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

  return (
    <div className="flex">
      <div>
        <NotesList
          notes={notes}
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
