import { useLocation, useNavigate } from "react-router-dom";
import type { Note } from "../../types/note";

type NotesListProps = {
  notes: Note[];
  handleSelectedNote: (note: Note) => void;
  onNoteCreation: () => void;
  selectedNote: Note | null;
  onArchiveOrRestore?: (id: string) => void;
  infoMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
};

const NotesList = ({
  notes,
  handleSelectedNote,
  onNoteCreation,
  selectedNote,
  infoMessage,
  emptyMessage,
}: NotesListProps) => {
  const getNoteDateLabel = (note: Note) => {
    if (note.isNew) return "";
    const isEdited = note.createdAt !== note.updatedAt;
    return isEdited ? note.updatedAt : note.createdAt;
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-72.5 max-xl:w-55 min-w-50 shrink-0 border-r h-screen border-[hsla(216,19%,90%,1)] dark:border-[hsla(231,16%,16%,1)] pl-8 pr-4 pt-5 pb-6 flex flex-col gap-4 bg-white dark:bg-[hsla(222,32%,8%,1)] dark:text-white">
      <button
        onClick={() => {
          if (location.pathname !== "/notes") {
            navigate("/notes", { state: { create: true } });
            return;
          }
          onNoteCreation();
        }}
        className="bg-[hsla(228,100%,60%,1)] px-2 py-1.5 text-white rounded-lg cursor-pointer w-full md:w-auto"
      >
        + Create New Note
      </button>
      <div className="overflow-y-auto flex flex-col gap-4 flex-1">
        {infoMessage && (
          <p className="p-2 rounded-lg text-[14px] text-[hsla(222,32%, 8%,1)] leading-[1.2] mb-px tracking-[-0.2px]">
            {infoMessage}
          </p>
        )}
        {notes.length === 0 && emptyMessage ? (
          <p className="bg-[hsla(216,19%,90%,1)] dark:bg-[hsla(231,16%,16%,1)] p-2 rounded-lg text-[14px] text-[hsla(222,32%, 8%,1)] leading-[1.2] mb-px tracking-[-0.2px]">
            {emptyMessage}
          </p>
        ) : (
          notes.map((note) => {
            const dateToShow = getNoteDateLabel(note);
            const isSelected = selectedNote?.id === note.id;
            return (
              <div
                key={note.id}
                className={`p-2 flex flex-col gap-3 border-[hsla(216,19%,90%,1)] dark:bg-[hsla(222,32%,8%,1)] dark:border-[hsla(231,16%,16%,1)] dark:text-white cursor-pointer ${
                  isSelected
                    ? "bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(231,16%,16%,1)] rounded-lg"
                    : "bg-white border-b"
                }`}
                onClick={() => handleSelectedNote(note)}
              >
                <h1 className="text-[16px] text-[hsla(222,32%,8%,1)] font-semibold dark:text-white">
                  {note.title}
                </h1>

                <div className="flex gap-2 flex-wrap">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[hsla(216,19%,90%,1)] px-1.5 py-0.5 rounded-sm text-[12px] dark:bg-[hsla(221,16%,20%,1)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {dateToShow && (
                  <p className="text-[12px] text-[hsla(221,16%,20%,1)] dark:text-[hsla(216,19%,90%,1)]">
                    {formatDate(dateToShow)}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotesList;
