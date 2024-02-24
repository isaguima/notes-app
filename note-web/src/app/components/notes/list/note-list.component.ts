import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: []
})
export class NoteListComponent implements OnInit {

  public notes: any[] = [];
  public searchTerm: string = '';

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.reload();
  }

  async reload() {
    const notes = await this.noteService.getNotes();
    this.notes = notes;
  }

  async search() {
    const notes = await this.noteService.getNotes(this.searchTerm);
    this.notes = notes;
  }

  async delete(id: string) {
    await this.noteService.deleteNote(id);
    this.reload();
  }
}
