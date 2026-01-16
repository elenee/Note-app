import { ArchiveIcon, ArrowIcon, HomeIcon, TagIcon } from "../../Icons/Icons";
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
  const pathname = location.pathname;

  return (
    <div className="w-68 max-xl:w-55 max-lg:w-60 shrink-0 flex flex-col gap-4 items-start py-3 px-4 border-r border-[hsla(216,19%,90%,1)] dark:border-[hsla(231,16%,16%,1)]">
      <Logo />
      <div className="flex flex-col items-start gap-1 w-full">
        <button
          onClick={() => navigate("/notes")}
          className={`group px-3 py-2.5 rounded-lg w-full flex justify-between items-center cursor-pointer  ${
            pathname.startsWith("/notes")
              ? "bg-[hsla(216,26%,96%,1)]  dark:bg-[hsla(231,16%,16%,1)] dark:text-white"
              : ""
          }`}
        >
          <div className="flex gap-2">
            <span
              className={`transition-colors group-hover:text-[hsla(228,100%,60%,1)] ${
                pathname.startsWith("/notes")
                  ? "text-[hsla(228,100%,60%,1)]"
                  : ""
              }`}
            >
              <HomeIcon />
            </span>
            <span>All notes</span>
          </div>
          {pathname === "/notes" ? <ArrowIcon /> : ""}
        </button>
        <button
          onClick={() => navigate("/archived-notes")}
          className={`group px-3 py-2.5 rounded-lg w-full flex justify-between items-center cursor-pointer ${
            pathname.startsWith("/archived-notes")
              ? "bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(231,16%,16%,1)] dark:text-white"
              : ""
          }`}
        >
          <div className="flex gap-2">
            <span
              className={`transition-colors group-hover:text-[hsla(228,100%,60%,1)] ${
                pathname.startsWith("/archived-notes")
                  ? "text-[hsla(228,100%,60%,1)]"
                  : ""
              }`}
            >
              <ArchiveIcon />
            </span>
            <span>Archived notes</span>
          </div>
          {pathname.startsWith("/archived-notes") ? <ArrowIcon /> : ""}
        </button>
      </div>
      <p className="px-2">Tags</p>
      {tags.length > 0 && (
        <div className="flex flex-col items-start w-full">
          {tags.map((tag) => (
            <button
              className={`flex items-center justify-between gap-2 py-2.5 px-3 w-full rounded-lg cursor-pointer ${
                pathname === `/tags/${tag}`
                  ? "bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(231,16%,16%,1)] dark:text-white"
                  : ""
              }`}
              key={tag}
              onClick={() => navigate(`/tags/${tag}`)}
            >
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <span
                    className={`transition-colors group-hover:text-[hsla(228,100%,60%,1)] ${
                      pathname === `/tags/${tag}`
                        ? "text-[hsla(228,100%,60%,1)]"
                        : ""
                    }`}
                  >
                    <TagIcon />
                  </span>
                  <span>{tag}</span>
                </div>
              </div>
              {pathname === `/tags/${tag}` ? <ArrowIcon /> : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesListSidebar;
