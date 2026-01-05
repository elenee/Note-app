import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import authService from "../../services/authService";
import notesService from "../../services/notesService";
import type { Note } from "../../types/note";

const Notes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [, setNotes] = useState<Note[]>([]);

  async function currentUser(token: any) {
    try {
      const user = await authService.getCurrentUser(token);
      console.log(user);
      setUser(user);
    } catch (error: any) {
      navigate("/");
    }
  }

  useEffect(() => {
    const token = cookies.accessToken;
    if (!token) {
      navigate("/");
      return;
    }
    setCookie("accessToken", token, {
      path: "/",
      maxAge: 60 * 60,
      secure: true,
      sameSite: "strict",
    });
    currentUser(token);

    const fetchNotes = async () => {
      try {
        const notes = await notesService.getNotes(token);
        setNotes(notes);
      } catch (error: any) {
        console.log("failed to fecth notes", error.message);
      }
    };
    fetchNotes();
  }, []);

  if (!user) return null;


  return <div></div>;
};

export default Notes;
