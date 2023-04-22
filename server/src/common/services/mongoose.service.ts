import mongoose from 'mongoose';
import debug from 'debug';
process.env.DEBUG = 'app:mongoose-service';
const log = debug('app:mongoose-service');
import * as dotenv from 'dotenv';
dotenv.config();
const mongodbString = process.env.MONGODB_STRING ? process.env.MONGODB_STRING : '';

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  };
  constructor() {
    log('in service constructor');
    this.connectWithRetry();
  }
  getMongoose() {
    log('in getMongoose function');
    return mongoose;
  }
  connectWithRetry = () => {
    log('Attempting MongoDB connection (will retry if needed)');
    mongoose
      .connect(mongodbString, this.mongooseOptions)
      .then(() => {
        log('MongoDB is connected');
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`, err);
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}

export default new MongooseService();
