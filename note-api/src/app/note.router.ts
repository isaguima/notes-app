import Express from 'express';
import { NoteController } from './note.controller';

export class NoteRouter {
  private readonly noteController: NoteController;
  public constructor() {
    this.noteController = new NoteController();
  }
  public getRoutes(): Express.Router {
    const router = Express.Router();
    router.get('/notes', this.noteController.getNotes.bind(this.noteController));

    router.post('/notes', this.noteController.postNotes.bind(this.noteController));
    router.get('/notes/:id', this.noteController.getNoteById.bind(this.noteController));
    router.put('/notes/:id', this.noteController.putNotesById.bind(this.noteController));
    router.delete('/notes/:id', this.noteController.deleteNotesById.bind(this.noteController));
    return router;
  }
}