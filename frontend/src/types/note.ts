export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
  isNew?: boolean;
};

