import 'source-map-support/register'
import { Request, Response } from 'express';
import { NoteController } from '../../app/note.controller';
import { INote } from '../../app/note';

describe('NoteController', () => {
  let noteController: NoteController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  const notesDummyData: any = [
    { id: '1', text: 'note 1' },
    { id: '2', text: 'note 2' },
    { id: '3', text: 'note 3' }
  ];

  beforeEach(() => {
    mockRequest = {
      params: {},
      query: {},
      body: {},
    };
    mockResponse = {
      status: jasmine.createSpy('status').and.callFake(() => mockResponse),
      json: jasmine.createSpy('json').and.callFake(() => mockResponse),
    };

    noteController = new NoteController();
  });
  describe('#getNotes', () => {
    beforeEach(() => {
      mockRequest = {
        params: {},
        query: {
          title: "some value"
        },
        body: {},
      };
    });

    it('should call NoteService.get() with correct arguments and return the result', async () => {
      const noteServiceSpyGet = spyOn(noteController.noteService, 'get').and.resolveTo(notesDummyData);

      await noteController.getNotes(mockRequest as Request, mockResponse as Response);

      expect(noteServiceSpyGet).toHaveBeenCalledWith();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(notesDummyData);
    });
  });

  describe('getNoteById', () => {
    const noteDummyData: any = {
      _id: '1234567890abcdef',
      title: 'Note test',
      body: 'This is a test.'
    };

    beforeEach(() => {
      mockRequest = {
        params: {
          id: noteDummyData._id
        },
        query: {},
        body: {},
      };
    });

    it('should get a note by Id and send it as JSON', async () => {
      const noteServiceSpy = spyOn(noteController.noteService, 'getById').and.resolveTo(noteDummyData)

      await noteController.getNoteById(mockRequest as Request, mockResponse as Response);

      expect(noteServiceSpy).toHaveBeenCalledWith(noteDummyData._id);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(noteDummyData);
    });

    it('should return a 404 error if no note was found', async () => {
      const noteServiceSpy = spyOn(noteController.noteService, 'getById').and.resolveTo(undefined)

      await noteController.getNoteById(mockRequest as Request, mockResponse as Response);

      expect(noteServiceSpy).toHaveBeenCalledWith(noteDummyData._id);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('postNotes', () => {
    const noteData: any = {
      title: 'New Test Note',
      content: 'This is a new test',
    };
    const createdNote = { _id: '1234567890abcdef', ...noteData } as INote;

    beforeEach(() => {
      mockRequest.body = noteData;
    });

    it('should create a new note with NoteService and send it as JSON', async () => {
      const noteServiceSpy = spyOn(noteController.noteService, 'create').and.resolveTo(createdNote);
      await noteController.postNotes(mockRequest as Request, mockResponse as Response);

      expect(noteServiceSpy).toHaveBeenCalledWith(noteData);
      expect(mockResponse.json).toHaveBeenCalledWith(createdNote);
    });

    it('should return a 400 error if an error occurred', async () => {
      const errorMessage = 'Error when creating note';
      const noteServiceSpy = spyOn(noteController.noteService, 'create').and.throwError(errorMessage);

      await noteController.postNotes(mockRequest as Request, mockResponse as Response);

      expect(noteServiceSpy).toHaveBeenCalledWith(noteData);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
