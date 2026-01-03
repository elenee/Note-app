import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export type CreateNoteDto = {
  title: string;
  tags: string[];
  content: string;
};

const normalizeNote = (note: any) => ({
  id: note._id,
  title: note.title,
  content: note.content,
  tags: note.tags,
  status: note.status,
  createdAt: note.createdAt,
  updatedAt: note.updatedAt,
});

const getNotes = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createNote = async (data: CreateNoteDto, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/notes`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return normalizeNote(response.data);
  } catch (error) {
    console.log("create error", error);
    throw error;
  }
};

const updateNote = async (id: string, data: CreateNoteDto, token: string) => {
  const response = await axios.put(`${BASE_URL}/notes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return normalizeNote(response.data);
};

const deleteNote = async (id: string, token: string) => {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
