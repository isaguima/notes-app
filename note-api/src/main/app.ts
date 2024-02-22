import Express from "express";
import cors from 'cors';

import { NoteRouter } from "../app/note.router";
import { MongoConnector } from "../infrastructure/database/mongo.connector";

export class App {
  private readonly mongoConnector: MongoConnector;
  private readonly noteRouter: NoteRouter;

  public constructor() {
    this.mongoConnector = new MongoConnector();
    this.noteRouter = new NoteRouter();
  }
  public async run(): Promise<Express.Express> {
    const express = Express();
    express.use(cors());

    express.use(Express.json());

    // Configuração do MongoDB com Mongoose:
    await this.mongoConnector.connect();

    // Listar todas as notas
    express.use(this.noteRouter.getRoutes());

    return express;

  }
}