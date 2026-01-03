export type Note = {
  id: string;
  title: string;
  tags: string[];
  content: string;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
  isNew?: boolean;
};


export type HeaderMode =
  | { type: "ALL" }
  | { type: "ARCHIVED" }
  | { type: "SETTINGS" }
  | { type: "TAG"; tag: string };
