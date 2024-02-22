import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteFormComponent } from './components/notes/form/note-form.component';
import { NoteListComponent } from './components/notes/list/note-list.component';

const routes: Routes = [
  { path: 'notes/new', component: NoteFormComponent },
  { path: 'notes/:id', component: NoteFormComponent },
  { path: 'notes', component: NoteListComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
