import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteFormComponent } from './components/notes/form/note-form.component';
import { NoteListComponent } from './components/notes/list/note-list.component';
import { NoteFilterPipe } from './components/notes/note.filter.pipe';
import { LimitHtmlCharactersPipe } from './pipes/limit-html-characters.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteFormComponent,
    NoteFilterPipe,
    LimitHtmlCharactersPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
