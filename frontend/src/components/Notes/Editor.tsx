import { useState, useEffect } from "react";
import type { Note } from "../../types/note";

type EditorProps = {
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
  onSaveNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onArchiveOrRestore: (id: string) => void;
  handleCancelNote: (id: string) => void;
};

const Editor = ({
  selectedNote,
  setSelectedNote,
  onSaveNote,
  onDeleteNote,
  onArchiveOrRestore,
  handleCancelNote,
}: EditorProps) => {
  const [tagsString, setTagsString] = useState(
    selectedNote?.tags.join(", ") || ""
  );

  useEffect(() => {
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

  if (!selectedNote) return "";
  const title = selectedNote.title || "";
  const content = selectedNote.content || "";
  const createdAt = selectedNote.createdAt || "";
  const updatedAt = selectedNote.updatedAt || "";
  const isNew = selectedNote.isNew || false;

  return (
    <div className="flex gap-10">
      <div className="w-147 h-screen border-r border-[hsla(216,19%,90%,1)] py-5 pb-6">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-[24px] font-bold"
            value={title}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, title: e.target.value })
            }
            placeholder="Enter a title…"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <label className="flex py-1 gap-1.5 items-center w-28.75">
                <img src="/Tag.svg" />
                Tags
              </label>
              <input
                type="text"
                className="bg-transparent border-none outline-none text-[14px] w-full"
                value={tagsString}
                onChange={handleTagsChange}
                placeholder="Add tags separated by commas (e.g. Work, Planning)"
              />
            </div>

            {selectedNote && selectedNote.status === "archived" && (
              <div className="flex items-center gap-1.5">
                <label className="flex py-1 gap-1.5 items-center w-28.75">
                  <img src="/Loading.svg" />
                  Status
                </label>
                <span className="bg-transparent border-none outline-none text-[14px] w-full">
                  Archived
                </span>
              </div>
            )}

            <div className="flex items-center">
              <label className="flex py-1 gap-1.5 items-center w-28.75">
                <img src="/Circle Clock.svg" />
                Last edited
              </label>
              <input
                className="bg-transparent border-none outline-none text-[14px]"
                value={isNew ? "" : createdAt || updatedAt}
                placeholder="Not yet saved"
                readOnly
              />
            </div>
          </div>
          <div className="bg-[hsla(216,19%,90%,1)] h-px"></div>
          <textarea
            className="h-141.75"
            value={content}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, content: e.target.value })
            }
          ></textarea>
          <div className="bg-[hsla(216,19%,90%,1)] h-px"></div>
          <div className="flex gap-4">
            <button
              className="bg-[hsla(228,100%,60%,1)] text-white px-4 py-3 rounded-lg"
              type="button"
              onClick={() => {
                if (selectedNote) onSaveNote(selectedNote);
              }}
            >
              Save Note
            </button>
            <button
              className="bg-[hsla(216,26%,96%,1)] text-[hsla(222,11%,36%,1)] px-4 py-3 rounded-lg cursor-pointer"
              type="button"
              onClick={() => selectedNote && handleCancelNote(selectedNote.id)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {selectedNote && !selectedNote.isNew && (
        <div className="flex flex-col py-5 pr-6 gap-3 w-64.5">
          <button
            className="flex border border-[hsla(219,15%,82%,1)] rounded-lg py-3 px-4 gap-2 items-center"
            onClick={() => onArchiveOrRestore(selectedNote.id)}
          >
            <img src="/Archive.svg" alt="" />
            {selectedNote.status === "archived"
              ? "Restore Note"
              : "Archive Note"}
          </button>
          <button
            className="flex border border-[hsla(219,15%,82%,1)] rounded-lg py-3 px-4 gap-2 items-center "
            onClick={() => onDeleteNote(selectedNote.id)}
          >
            <img src="/Delete.svg" alt="" />
            Delete Note
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
