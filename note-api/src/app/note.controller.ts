import { Request, Response } from 'express';
import { INote } from './note';
import { NoteService } from './note.service';

export class NoteController {
  public readonly noteService: NoteService;
  public constructor() {
    this.noteService = new NoteService();
  }
  public async getNotes(req: Request, res: Response) {
    const { skip = 0, limit = 100, title = '' } = req.query;
    const notes = await this.noteService.get(`${title}`, Number(skip), Number(limit));
    return res.json(notes);
  }

  public async getNoteById(req: Request, res: Response) {
    const note = await this.noteService.getById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.json(note);
  }

  public async postNotes(req: Request, res: Response) {
    try {
      const note = req.body as INote;
      const createdNote = await this.noteService.create(note);
      return res.json(createdNote);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async putNotesById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const updatedNote = await this.noteService.update(id, req.body);
      if (!updatedNote) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json(updatedNote);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async deleteNotesById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.noteService.delete(id);
      return res.status(204).json({ message: 'Note deleted successfuly' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
