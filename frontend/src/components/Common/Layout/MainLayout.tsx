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

const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies, removeCookie] = useCookies(["accessToken"]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

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
        setNotes(notes);
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
    return <div>Loading...</div>;
  }

  if (!user) return null;
  return (
    <div className="flex h-screen overflow-auto bg-white dark:bg-[hsla(222,32%,8%,1)] dark:text-white relative">
      <NotesListSidebar notes={notes} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header
          onSettingsClick={() => navigate("/settings")}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex-1 overflow-auto">
          <Outlet
            context={{
              notes: filteredNotes,
              setNotes,
              token: cookies.accessToken,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
