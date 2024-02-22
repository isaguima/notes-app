import mongoose, { ConnectOptions } from "mongoose";

export class MongoConnector {
  public async connect(): Promise<void> {
    const url = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/notes`;
    const options: ConnectOptions = {
    };
    await mongoose.connect(url, options)
    console.log("MongoDB conectado");
  }

}