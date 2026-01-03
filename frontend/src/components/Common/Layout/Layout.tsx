import { useState } from "react";
import NotesListSidebar from "../../NotesList/NotesListSidebar";
import Header from "../Header";
import type { HeaderMode, Note } from "../../../types/note";
import NotesList from "../../NotesList/NotesList";
import Editor from "../../NotesList/Editor";
import Settings from "../../Settings/Settings";
import notesService from "../../../services/notesService";

type LayoutProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  handleLogout: () => void;
  token: string;
};

const Layout = ({ notes, setNotes, handleLogout, token }: LayoutProps) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [mode, setMode] = useState<HeaderMode>({ type: "ALL" });
  const [headerMode, setHeaderMode] = useState<HeaderMode>({ type: "ALL" });

  const filteredNotes: Note[] = (() => {
    switch (mode.type) {
      case "ALL":
        return notes.filter((n) => n.status === "active");
      case "ARCHIVED":
        return notes.filter((n) => n.status === "archived");
      case "TAG":
        return notes.filter((n) => n.tags.includes(mode.tag));
      default:
        return [];
    }
  })();

  const handleSelectedNote = (note: Note) => setSelectedNote(note);

  const handleNoteCreation = () => {
    const note: Note = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      tags: [],
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isNew: true,
    };

    const sidebarNote = { ...note, title: "Untitled note" };

    setNotes((prev) => [sidebarNote, ...prev]);
    setSelectedNote(note);
  };

  const handleSaveNote = async (note: Note, token: string) => {
    try {
      const dto = {
        title: note.title,
        content: note.content,
        tags: note.tags,
      };

      if (!note.title.trim() || !note.content.trim()) return;

      const savedNote = note.isNew
        ? await notesService.createNote(dto, token)
        : await notesService.updateNote(note.id, dto, token);

      if (!savedNote) return;

      setNotes((prev) => prev.map((n) => (n.id === note.id ? savedNote : n)));

      setSelectedNote(savedNote);
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <NotesListSidebar
        mode={mode}
        setMode={(newMode) => {
          setMode(newMode);
          setHeaderMode(newMode);
        }}
        notes={notes}
      />

      <div className="flex flex-col flex-1">
        <Header
          mode={headerMode}
          onSettingsClick={() => setHeaderMode({ type: "SETTINGS" })}
        />

        <div className="flex ">
          {mode.type === "SETTINGS" ? (
            <div className="p-6">
              <Settings handleLogout={handleLogout} />
            </div>
          ) : (
            <div className="flex gap-10 ">
              <div className="">
                <NotesList
                  notes={filteredNotes}
                  handleSelectedNote={handleSelectedNote}
                  onNoteCreation={handleNoteCreation}
                  sectionType={mode.type}
                />
              </div>
              <div className=" w-147">
                <Editor
                  selectedNote={selectedNote}
                  setSelectedNote={setSelectedNote}
                  onSaveNote={(note) => handleSaveNote(note, token)}
                />
              </div>
              {selectedNote && (
                <div className="flex flex-col py-5 pr-6 gap-3 w-64.5">
                  <button className="flex border border-[hsla(219,15%,82%,1)] rounded-lg py-3 px-4 gap-2 items-center">
                    <img src="/Archive.svg" alt="" />
                    Archive Note
                  </button>
                  <button className="flex border border-[hsla(219,15%,82%,1)] rounded-lg py-3 px-4 gap-2 items-center">
                    <img src="/Delete.svg" alt="" />
                    Delete Note
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
