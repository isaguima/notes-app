import { Types } from 'mongoose';
import { Note, INote } from '../../app/note';
import { NoteService } from '../../app/note.service';
import { MongoConnector } from '../../infrastructure/database/mongo.connector';

describe('NoteService', () => {
  let noteService: NoteService;
  let mongoConnector: MongoConnector;
  beforeAll(async () => {
    mongoConnector = new MongoConnector();
    await mongoConnector.connect();
  });

  beforeEach(() => {
    noteService = new NoteService();
  });

  describe('get', () => {
    beforeEach(async () => {
      await Note.deleteMany({});
    });
    it('should return all notes when an empty filter is used', async () => {
      const mockNote1 = { title: 'Title 1', content: 'Content 1' } as INote;
      const mockNote2 = { title: 'Title 2', content: 'Content 2' } as INote;
      await Note.create([mockNote1, mockNote2]);

      const result = await noteService.get();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(jasmine.objectContaining({ ...mockNote1 }));
      expect(result[1]).toEqual(jasmine.objectContaining({ ...mockNote2 }));

    });

    it('should return only the notes that match the filter', async () => {
      const mockNote1 = { title: 'Title 1', content: 'Content 1' } as INote;
      const mockNote2 = { title: 'Title 2', content: 'Content 2' } as INote;
      await Note.create([mockNote1, mockNote2]);

      const result: any = await noteService.get('Title 1');

      expect(result[0]).toEqual(jasmine.objectContaining({ ...mockNote1 }));
    });
  });

  describe('getById', () => {
    beforeEach(async () => {
      await Note.deleteMany({});
    });
    it('should return the correct note for a valid ID', async () => {
      const mockNote = { title: 'Title', content: 'Content' } as INote;
      const { _id } = await Note.create(mockNote);

      const result: any = await noteService.getById(_id);

      expect(result).toEqual(jasmine.objectContaining({ ...mockNote, _id }));
    });

    it('should return null for an invalid ID', async () => {
      const invalidId = '640f7663ad36a0e132f08407';
      const result = await noteService.getById(invalidId);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    beforeEach(async () => {
      await Note.deleteMany({});
    });
    it('should create a new note and return it', async () => {
      const mockNote = { title: 'New Title', content: 'New Content' } as INote;

      const result: any = await noteService.create(mockNote);

      expect(result).toEqual(jasmine.objectContaining({ ...mockNote, _id: jasmine.anything() }));
    });

    it('should throw an error if the note creation fails', async () => {
      spyOn(Note, 'create').and.throwError('Test Error');
      const mockNote = { title: 'New Title', content: 'New Content' } as INote;

      try {
        await noteService.create(mockNote);
      } catch (error) {
        expect(error.message).toBe('Erro ao criar nota');
      }
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      await Note.deleteMany({});
    });
    it('should update an existing note and return it', async () => {
      const mockNote = { title: 'Old Title', content: 'Old Content' } as INote;
      const { _id } = await Note.create(mockNote);

      const updatedMockNote = { title: 'Updated Title', content: 'Updated Content' } as INote;
      const result: any = await noteService.update(_id, updatedMockNote);

      expect(result).toEqual(jasmine.objectContaining({ ...updatedMockNote, _id }));
    });

    it('should throw an error if the ID is invalid', async () => {
      spyOn(Note, 'findByIdAndUpdate');
      const mockNote = { title: 'Old Title', content: 'Old Content' } as INote;

      try {
        await noteService.update('invalidID', mockNote);
      } catch (error) {
        expect(error.message).toBe('ID inválido');
      }

      expect(Note.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('should throw an error if the note update fails', async () => {
      spyOn(Note, 'findByIdAndUpdate').and.throwError('Test Error');
      const mockNote = { title: 'Old Title', content: 'Old Content' } as INote;
      const { _id } = await Note.create(mockNote);

      try {
        await noteService.update(_id, mockNote);
      } catch (error) {
        expect(error.message).toBe('Erro ao atualizar nota');
      }
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      await Note.deleteMany({});
    });
    it('should throw an error if provided with an invalid ID', async () => {
      const invalidId = 'not-a-valid-id';

      try {
        await noteService.delete(invalidId);
      } catch (error) {
        expect(error.message).toEqual('ID inválido');
      }
    });

    it('should call findByIdAndDelete with the id and delete the note', async () => {
      const validId = (new Types.ObjectId()).toHexString();
      spyOn(Note, 'findByIdAndDelete').and.resolveTo();
      await noteService.delete(validId);

      expect(Note.findByIdAndDelete).toHaveBeenCalledWith(validId);
    });

    it('should throw an error when trying to delete a non-existent note', async () => {
      const validId = (new Types.ObjectId()).toHexString();
      spyOn(Note, 'findByIdAndDelete').and.resolveTo(null);

      try {
        await noteService.delete(validId);
      } catch (error) {
        expect(Note.findByIdAndDelete).toHaveBeenCalledWith(validId);
        expect(error.message).toEqual('Erro ao excluir nota');
      }
    })
  });

});