import mongoose from "mongoose";

const NoteEntity = {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  }
}

export const NoteSchema = new mongoose.Schema(NoteEntity);