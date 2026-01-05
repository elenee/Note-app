import type { Note } from "../../types/note";
import Logo from "../Common/Logo";

import { useLocation, useNavigate } from "react-router-dom";

type NotesListSidebarProps = {
  notes: Note[];
};

const NotesListSidebar = ({ notes }: NotesListSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  return (
    <div className="flex flex-col gap-4 items-start w-68 py-3 px-4 border-r border-[hsla(216,19%,90%,1)]">
      <Logo />
      <div className="flex flex-col items-start gap-1 w-full">
        <div
          className={`px-3 py-2.5 rounded-lg w-full flex gap-2 ${
            location.pathname === "/notes" ? "bg-[hsla(216,26%,96%,1)]" : ""
          }`}
        >
          <img src="/Home.svg" alt="" />
          <button
            onClick={() => navigate("/notes")}
            className={location.pathname === "/notes" ? "font-bold" : ""}
          >
            All notes
          </button>
        </div>
        <div
          className={`px-3 py-2.5 rounded-lg w-full flex gap-2 ${
            location.pathname === "/archived" ? "bg-[hsla(216,26%,96%,1)]" : ""
          }`}
        >
          <img src="/Archive.svg" alt="" />
          <button
            className={location.pathname === "/archived" ? "font-bold" : ""}
            onClick={() => navigate("/archived")}
          >
            Archived notes
          </button>
        </div>
      </div>
      <p className="px-2">Tags</p>
      {tags.length > 0 && (
        <div className="flex flex-col items-start w-full">
          {tags.map((tag) => (
            <button
              className="flex items-center gap-2 py-2.5 px-3"
              key={tag}
              onClick={() => navigate(`/tags/${tag}`)}
            >
              <img src="/Tag.svg" alt="" />
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesListSidebar;
