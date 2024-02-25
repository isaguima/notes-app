import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:3000/notes';

  constructor() { }

  public async getNotes(title='') {
    let query = '';
    if(title) {
      query = `title=${title}`;
    }
    const response = await axios.get(`${this.apiUrl}?${query}`);
    return response.data;
  }

  public async getNoteById(id: string) {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return response.data;
  }

  public async postNote(title: string, content: string) {
    const response = await axios.post(this.apiUrl, { title, content });
    return response.data;
  }

  public async updateNote(id: string, title: string, content: string) {
    const response = await axios.put(`${this.apiUrl}/${id}`, { title, content });
    return response.data;
  }

  public async deleteNote(id: string) {
    const response = await axios.delete(`${this.apiUrl}/${id}`);
    return response.data;
  }
}
