import { App } from "./app";

export class Server {
  public readonly app: App;
  public constructor() {
    this.app = new App();
  }
  public async up() : Promise<void> {
    const express = await this.app.run();
    express.listen(3000, () => {
      console.log("Servidor iniciado na porta 3000");
    });
  }
}