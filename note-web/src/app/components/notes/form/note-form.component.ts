import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: []
})
export class NoteFormComponent {

  public id: string = 'new';
  public title: string = '';
  public content: string = '';

  @ViewChild('myEditor') editorComponent?: EditorComponent;

  constructor(
    private readonly noteService: NoteService = new NoteService(),
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const noteId = params.get('id');
      if (noteId && noteId !== 'new') {
        const note = await this.noteService.getNoteById(noteId);
        this.id = note._id;
        this.title = note.title;
        this.content = note.content;
      } else {
        this.id = 'new';
      }

    });
  }

  ngAfterViewInit() {
    this.editorComponent?.editor.on('change', () => {
      this.content = this.editorComponent!.editor.getContent();
    });
  }

  onEditorInit(event: any) {
    console.log('Editor ready', event);
  }

  async save() {
    if (this.id !== 'new') {
      const note = await this.noteService.updateNote(this.id, this.title, this.content)
      this.id = note._id;
    } else {
      const note = await this.noteService.postNote(this.title, this.content);
      this.id = note._id;
    }
    this.router.navigate(['/notes']);
  }
}
