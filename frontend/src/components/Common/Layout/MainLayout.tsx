import { Outlet } from "react-router-dom";
import NotesListSidebar from "../../Notes/NotesListSidebar";
import Header from "../Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import type { Note } from "../../../types/note";
import authService from "../../../services/authService";
import notesService from "../../../services/notesService";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Loader/Loader";

const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies, removeCookie] = useCookies(["accessToken"]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getCurrentUser(token: string) {
    try {
      const user = await authService.getCurrentUser(token);
      console.log(user);
      setUser(user);
    } catch (error) {
      removeCookie("accessToken", { path: "/" });
      navigate("/auth/sign-in");
    }
  }

  useEffect(() => {
    const token = cookies.accessToken;
    if (!token) {
      navigate("/auth/sign-in");
    }
    getCurrentUser(token);

    const fetchNotes = async () => {
      try {
        const notes = await notesService.getNotes(token);
        console.log(notes);
        setNotes((prev) => {
          const byId = new Map<string, Note>();

          prev.forEach((note) => {
            byId.set(note.id, note);
          });

          notes.forEach((note: Note) => {
            byId.set(note.id, note);
          });

          return Array.from(byId.values());
        });
      } catch (error: any) {
        removeCookie("accessToken", { path: "/" });
        console.log("failed to fecth notes", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [cookies.accessToken, navigate, removeCookie]);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) return null;
  return (
    <div className="flex h-screen overflow-auto bg-white dark:bg-[hsla(222,32%,8%,1)] dark:text-white relative">
      <NotesListSidebar notes={notes} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header onSettingsClick={() => navigate("/settings")} />
        <div className="flex-1 overflow-auto">
          <Outlet
            context={{
              notes,
              setNotes,
              token: cookies.accessToken,
              onArchiveOrRestore: (id: string) => {
                setNotes((prev) =>
                  prev.map((note) =>
                    note.id === id
                      ? {
                          ...note,
                          status:
                            note.status === "active" ? "archived" : "active",
                        }
                      : note
                  )
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
