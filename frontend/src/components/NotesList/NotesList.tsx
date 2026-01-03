import type { Note } from "../../types/note";

type NotesListProps = {
  notes: Note[];
  handleSelectedNote: (note: Note) => void;
  onNoteCreation: () => void;
  sectionType: "ALL" | "ARCHIVED" | "TAG";
};

const NotesList = ({
  notes,
  handleSelectedNote,
  onNoteCreation,
  sectionType,
}: NotesListProps) => {
  const getNoteDateLabel = (note: Note) => {
    const isEdited = note.createdAt !== note.updatedAt;
    return isEdited ? note.updatedAt : note.createdAt;
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="w-72.5 border-r border-[hsla(216,19%,90%,1)] pl-8 pr-4 pt-5 h-screen flex flex-col gap-4 scroll-auto">
      <button
        onClick={onNoteCreation}
        className="bg-[hsla(228,100%,60%,1)] px-2 py-1.5 text-white rounded-lg cursor-pointer"
      >
        + Create New Note
      </button>
      {notes.length === 0 ? (
        <p className="bg-[hsla(216,19%,90%,1)] p-2 rounded-lg text-[14px] text-[hsla(222,32%, 8%,1)] leading-[1.2] mb-px tracking-[-0.2px]">
          {sectionType === "ARCHIVED"
            ? "All your archived notes are stored here. You can restore or delete them anytime.\n\nNo notes have been archived yet. Move notes here for safekeeping, or create a new note."
            : sectionType === "ALL"
            ? "You don’t have any notes yet. Start a new note to capture your thoughts and ideas."
            : `You don’t have any notes tagged with "${sectionType}".`}
        </p>
      ) : (
        notes.map((note) => {
          const dateToShow = getNoteDateLabel(note);
          return (
            <div
              key={note.id}
              className="bg-[hsla(216,26%,96%,1)] p-2 rounded-lg flex flex-col gap-3"
              onClick={() => handleSelectedNote(note)}
            >
              <h1 className="text-[16px] text-[hsla(222,32%,8%,1)] font-semibold">
                {note.title}
              </h1>

              <div className="flex gap-2 flex-wrap">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[hsla(216,19%,90%,1)] px-1.5 py-0.5 rounded-sm text-[12px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[12px] text-[hsla(221,16%,20%,1)]">
                {note.createdAt === note.updatedAt ? "Created" : "Edited"} ·{" "}
                {formatDate(dateToShow)}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default NotesList;
