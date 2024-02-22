import mongoose from "mongoose";
import { NoteSchema } from "./note.schema";

export interface INote extends mongoose.Document {
  title: string;
  content: string;
}

export const Note = mongoose.model<INote>('Note', NoteSchema);