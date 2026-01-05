import { Outlet } from "react-router-dom";
import NotesListSidebar from "../../Notes/NotesListSidebar";
import Header from "../Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import type { Note } from "../../../types/note";
import authService from "../../../services/authService";
import notesService from "../../../services/notesService";

const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
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

      return;
    }

    setCookie("accessToken", token, {
      path: "/",
      maxAge: 60 * 60,
      secure: true,
      sameSite: "strict",
    });

    getCurrentUser(token);

    const fetchNotes = async () => {
      try {
        const notes = await notesService.getNotes(token);
        setNotes(notes);
      } catch (error: any) {
        console.log("failed to fecth notes", error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [cookies.accessToken, navigate, setCookie]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) return null;
  return (
    <div className="flex h-screen">
      <NotesListSidebar notes={notes} />
      <div className="flex flex-col flex-1">
        <Header onSettingsClick={() => navigate("/settings")} />
        <Outlet context={{ notes, setNotes, token: cookies.accessToken }} />
      </div>
    </div>
  );
};

export default MainLayout;
