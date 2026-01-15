import { useState, useEffect } from "react";
import type { Note } from "../../types/note";
import {
  ArchiveIcon,
  ClockIcon,
  DeleteIcon,
  RestoreIcon,
  StatusIcon,
  TagIcon,
} from "../../Icons/Icons";

type EditorProps = {
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
  onSaveNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  handleCancelNote: (id: string) => void;
};

const Editor = ({
  selectedNote,
  setSelectedNote,
  onSaveNote,
  onDeleteNote,
  onArchive,
  onRestore,
  handleCancelNote,
}: EditorProps) => {
  const [tagsString, setTagsString] = useState(
    selectedNote?.tags.join(", ") || ""
  );

  useEffect(() => {
    if (!selectedNote) return;
    if (selectedNote) {
      setTagsString(selectedNote.tags.join(", "));
    }
  }, [selectedNote?.id]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagsString(value);

    if (selectedNote) {
      const tagsArray = value
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      setSelectedNote({ ...selectedNote, tags: tagsArray });
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (!selectedNote) return "";
  const title = selectedNote.title || "";
  const content = selectedNote.content || "";
  const createdAt = formatDate(selectedNote.createdAt) || "";
  const updatedAt = formatDate(selectedNote.updatedAt) || "";
  const isNew = selectedNote.isNew || false;

  return (
    <div className="flex max-lg:gap-6 min-h-screen w-full max-lg:flex-col">
      <div className="flex-2 h-screen border-r border-[hsla(216,19%,90%,1)] dark:border-[hsla(231,16%,16%,1)] pt-5 pb-6 px-6">
        <form className="h-full flex flex-col gap-4">
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-[24px] font-bold focus:ring focus:rounded-lg focus:rind-[hsla(216,19%,90%,1)]"
            value={title}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, title: e.target.value })
            }
            placeholder="Enter a title…"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <label className="flex py-1 gap-1.5 items-center w-28.75 shrink-0">
                <TagIcon />
                Tags
              </label>
              <input
                type="text"
                className="bg-transparent border-none outline-none text-[14px] w-full focus:ring focus:rounded-lg focus:rind-[hsla(216,19%,90%,1)]"
                value={tagsString}
                onChange={handleTagsChange}
                placeholder="Add tags separated by commas (e.g. Work, Planning)"
              />
            </div>

            {selectedNote && selectedNote.status === "archived" && (
              <div className="flex items-center gap-1.5">
                <label className="flex py-1 gap-1.5 items-center w-28.75 shrink-0">
                  <StatusIcon />
                  Status
                </label>
                <span className="bg-transparent border-none outline-none text-[14px] w-full">
                  Archived
                </span>
              </div>
            )}

            <div className="flex items-center">
              <label className="flex py-1 gap-1.5 items-center w-28.75 shrink-0">
                <ClockIcon />
                Last edited
              </label>
              <input
                className="bg-transparent border-none outline-none text-[14px] w-full"
                value={isNew ? "" : createdAt || updatedAt}
                placeholder="Not yet saved"
                readOnly
              />
            </div>
          </div>
          <div className="bg-[hsla(216,19%,90%,1)] h-px dark:bg-[hsla(231,16%,16%,1)]"></div>
          <textarea
            className="flex-1 max-h-125 w-full resize-none bg-transparent border-none outline-none focus:ring focus:rounded-lg focus:rind-[hsla(216,19%,90%,1)]"
            value={content}
            placeholder="Start typing your note here…"
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, content: e.target.value })
            }
          ></textarea>
          <div className="bg-[hsla(216,19%,90%,1)] h-px dark:bg-[hsla(231,16%,16%,1)]"></div>
          <div className="flex gap-4">
            <button
              className="bg-[hsla(228,100%,60%,1)] text-white px-4 py-3 rounded-lg cursor-pointer"
              type="button"
              onClick={() => {
                if (selectedNote) onSaveNote(selectedNote);
              }}
            >
              Save Note
            </button>
            <button
              className="bg-[hsla(216,26%,96%,1)] text-[hsla(222,11%,36%,1)] px-4 py-3 rounded-lg cursor-pointer dark:bg-[hsla(231,16%,16%,1)]"
              type="button"
              onClick={() => selectedNote && handleCancelNote(selectedNote.id)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {selectedNote && !selectedNote.isNew && (
        <div className="flex-1 flex flex-col py-5 px-6 gap-3 lg:max-w-64.5 border-[hsla(216,19%,90%,1)] max-lg:border-t dark:border-[hsla(231,16%,16%,1)]">
          <button
            className="group flex border border-[hsla(219,15%,82%,1)] dark:border-[hsla(231,16%,16%,1)] rounded-lg py-3 px-4 gap-2 items-center cursor-pointer w-full"
            onClick={() => {
              selectedNote.status === "archived"
                ? onRestore(selectedNote.id)
                : onArchive(selectedNote.id);
            }}
          >
            <span className="transition-colors group-hover:text-[hsla(228,100%,60%,1)]">
              {selectedNote.status === "active" ? (
                <ArchiveIcon />
              ) : (
                <RestoreIcon />
              )}
            </span>
            {selectedNote.status === "archived"
              ? "Restore Note"
              : "Archive Note"}
          </button>
          <button
            className="group flex border border-[hsla(219,15%,82%,1)] dark:border-[hsla(231,16%,16%,1)] rounded-lg py-3 px-4 gap-2 items-center cursor-pointer w-full"
            onClick={() => onDeleteNote(selectedNote.id)}
          >
            <span className="transition-colors group-hover:text-[hsla(228,100%,60%,1)]">
              <DeleteIcon />
            </span>
            Delete Note
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
