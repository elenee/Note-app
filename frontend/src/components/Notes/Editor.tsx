import { useState, useEffect } from "react";
import type { Note } from "../../types/note";

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
            className="w-full bg-transparent border-none outline-none text-[24px] font-bold"
            value={title}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, title: e.target.value })
            }
            placeholder="Enter a title…"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <label className="flex py-1 gap-1.5 items-center w-28.75 shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.01055 3.9783C2.01249 3.03712 2.72405 2.19324 3.64772 2.03432C3.83712 2.00124 6.05872 2.00578 6.97787 2.00643C7.88727 2.00708 8.6624 2.33399 9.30454 2.97485C10.668 4.3357 12.0301 5.69785 13.3903 7.06132C14.1953 7.86759 14.2063 9.10519 13.4046 9.91405C12.2481 11.0816 11.0857 12.2433 9.9188 13.3999C9.1106 14.2009 7.873 14.1905 7.06607 13.3856C5.69029 12.0137 4.31452 10.6418 2.94459 9.26405C2.41465 8.73092 2.10201 8.08679 2.0326 7.33372C1.97681 6.73179 2.00925 4.49397 2.01055 3.9783Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.60475 5.54289C6.60215 6.12277 6.11761 6.59953 5.53189 6.59823C4.95006 6.59693 4.46552 6.11175 4.46877 5.53381C4.47266 4.93057 4.95006 4.46031 5.55719 4.4629C6.13318 4.46485 6.60734 4.95327 6.60475 5.54289Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                <label className="flex py-1 gap-1.5 items-center w-28.75 shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.772 4.23187C3.95224 4.05162 4.24447 4.05162 4.42471 4.23186L5.00871 4.81583C5.18895 4.99607 5.18895 5.2883 5.00871 5.46855C4.82847 5.64879 4.53624 5.64879 4.356 5.46855L3.77201 4.88458C3.59176 4.70434 3.59176 4.41211 3.772 4.23187ZM5.00861 10.5293C5.18891 10.7095 5.18899 11.0018 5.0088 11.1821L3.94961 12.2418C3.76942 12.4221 3.47719 12.4222 3.2969 12.242C3.1166 12.0618 3.11652 11.7696 3.29671 11.5893L4.3559 10.5295C4.53609 10.3492 4.82832 10.3491 5.00861 10.5293ZM10.0703 10.5293C10.2505 10.3491 10.5428 10.3492 10.723 10.5295L11.7822 11.5893C11.9623 11.7696 11.9623 12.0618 11.782 12.242C11.6017 12.4222 11.3095 12.4221 11.1293 12.2418L10.0701 11.1821C9.88992 11.0018 9.88998 10.7095 10.0703 10.5293Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.53852 3.05566C7.79341 3.05566 8.00005 3.2623 8.00005 3.5172V3.95892C8.00005 4.21382 7.79341 4.42046 7.53852 4.42046C7.28362 4.42046 7.07698 4.21382 7.07698 3.95892V3.5172C7.07698 3.2623 7.28362 3.05566 7.53852 3.05566ZM1.88232 7.99927C1.88232 7.74438 2.08896 7.53773 2.34386 7.53773H3.49815C3.75304 7.53773 3.95968 7.74438 3.95968 7.99927C3.95968 8.25416 3.75304 8.46081 3.49815 8.46081H2.34386C2.08896 8.46081 1.88232 8.25416 1.88232 7.99927ZM11.1174 7.99927C11.1174 7.74438 11.324 7.53773 11.5789 7.53773H13.077C13.3319 7.53773 13.5385 7.74438 13.5385 7.99927C13.5385 8.25416 13.3319 8.46081 13.077 8.46081H11.5789C11.324 8.46081 11.1174 8.25416 11.1174 7.99927ZM7.53852 11.5782C7.79341 11.5782 8.00005 11.7848 8.00005 12.0397V13.5378C8.00005 13.7927 7.79341 13.9993 7.53852 13.9993C7.28362 13.9993 7.07698 13.7927 7.07698 13.5378V12.0397C7.07698 11.7848 7.28362 11.5782 7.53852 11.5782Z"
                      fill="currentColor"
                    />
                  </svg>
                  Status
                </label>
                <span className="bg-transparent border-none outline-none text-[14px] w-full">
                  Archived
                </span>
              </div>
            )}

            <div className="flex items-center">
              <label className="flex py-1 gap-1.5 items-center w-28.75 shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.16699 2.5C5.12919 2.5 2.66699 4.96219 2.66699 8C2.66699 11.0372 5.12923 13.5 8.16699 13.5C11.2048 13.5 13.667 11.0372 13.667 8C13.667 4.96219 11.2048 2.5 8.16699 2.5ZM1.66699 8C1.66699 4.40991 4.57691 1.5 8.16699 1.5C11.7571 1.5 14.667 4.40991 14.667 8C14.667 11.5894 11.7571 14.5 8.16699 14.5C4.57687 14.5 1.66699 11.5894 1.66699 8Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.94824 5.21777C8.22438 5.21777 8.44824 5.44163 8.44824 5.71777V8.16619L10.3212 9.28553C10.5583 9.42719 10.6356 9.73419 10.494 9.97126C10.3523 10.2083 10.0453 10.2856 9.80824 10.1439L7.69171 8.87906C7.54071 8.78879 7.44824 8.62586 7.44824 8.44986V5.71777C7.44824 5.44163 7.67211 5.21777 7.94824 5.21777Z"
                    fill="currentColor"
                  />
                </svg>
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
            className="flex-1 max-h-125 w-full resize-none bg-transparent border-none outline-none"
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
        <div className="lg:flex-1 flex flex-col py-5 px-6 gap-3 lg:max-w-64.5 border-[hsla(216,19%,90%,1)] max-lg:border-t dark:border-[hsla(231,16%,16%,1)]">
          <button
            className="flex border border-[hsla(219,15%,82%,1)] dark:border-[hsla(231,16%,16%,1)] rounded-lg py-3 px-4 gap-2 items-center cursor-pointer w-full"
            onClick={() => {
              selectedNote.status === "archived"
                ? onRestore(selectedNote.id)
                : onArchive(selectedNote.id);
            }}
          >
            {selectedNote.status === "active" ? (
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 11.6667L9.9985 14.1667L7.5 11.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99829 14.1666V8.33331"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.4447 5.83331H2.54883"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.09026 6.16962C3.4082 6.03519 3.7749 6.18396 3.90932 6.50189L5.00629 9.09638L7.58326 8.0068C7.9012 7.87239 8.2679 8.02114 8.40233 8.33904C8.53675 8.65704 8.388 9.02371 8.07005 9.15813L4.91741 10.491C4.59948 10.6255 4.23278 10.4767 4.09836 10.1588L2.758 6.98867C2.62357 6.67074 2.77234 6.30404 3.09026 6.16962Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.7624 4.71991C7.89009 4.71991 5.55539 7.008 5.4832 9.85328C5.47445 10.1983 5.18762 10.4709 4.84255 10.4622C4.49749 10.4534 4.22485 10.1666 4.2336 9.82153C4.32299 6.29821 7.21239 3.46991 10.7624 3.46991C14.366 3.46991 17.2915 6.39544 17.2915 9.99894C17.2915 13.6097 14.3655 16.528 10.7624 16.528C8.52867 16.528 6.56351 15.41 5.38176 13.708C5.18489 13.4244 5.25516 13.035 5.53869 12.8382C5.82223 12.6413 6.21167 12.7115 6.40854 12.9951C7.36759 14.3764 8.957 15.278 10.7624 15.278C13.6761 15.278 16.0415 12.9184 16.0415 9.99894C16.0415 7.0858 13.6756 4.71991 10.7624 4.71991Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {selectedNote.status === "archived"
              ? "Restore Note"
              : "Archive Note"}
          </button>
          <button
            className="flex border border-[hsla(219,15%,82%,1)] dark:border-[hsla(231,16%,16%,1)] rounded-lg py-3 px-4 gap-2 items-center cursor-pointer w-full"
            onClick={() => onDeleteNote(selectedNote.id)}
          >
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.2 7.44061V14.3892C15.2 15.7209 14.0895 16.8004 12.7195 16.8004H7.09717C5.72725 16.8004 4.6167 15.7209 4.6167 14.3892V7.44061"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.49936 10.2531V13.8598M11.3164 10.2531V13.8598"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Delete Note
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
