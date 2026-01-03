import { useState, useEffect } from "react";
import type { Note } from "../../types/note";

type EditorProps = {
  selectedNote: Note | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
  onSaveNote: (note: Note) => void;
};

const Editor = ({ selectedNote, setSelectedNote, onSaveNote }: EditorProps) => {
  const [tagsString, setTagsString] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTagsString(selectedNote.tags.join(", "));
    }
  }, [selectedNote]);

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

  return (
    <div className="w-147 border-r border-[hsla(216,19%,90%,1)] py-5">
      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-[24px] font-bold"
          value={selectedNote.title}
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
          <div className="flex items-center">
            <label className="flex py-1 gap-1.5 items-center w-28.75">
              <img src="/Circle Clock.svg" />
              Last edited
            </label>
            <input
              className="bg-transparent border-none outline-none text-[14px]"
              value={
                selectedNote.isNew
                  ? ""
                  : selectedNote.createdAt || selectedNote.updatedAt
              }
              placeholder="Not yet saved"
              readOnly
            />
          </div>
        </div>
        <div className="bg-[hsla(216,19%,90%,1)] h-px"></div>
        <textarea
          className="h-141.75"
          value={selectedNote.content}
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
            className="bg-[hsla(216,26%,96%,1)] text-[hsla(222,11%,36%,1)] px-4 py-3 rounded-lg"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
