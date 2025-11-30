import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database Configuration
 * Handles MongoDB connection
 */
class Database {
  constructor() {
    this.connection = null;
  }

  /**
   * Connect to MongoDB database
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/audit-trail';
      
      this.connection = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log(`MongoDB Connected: ${this.connection.connection.host}`);
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
  }

  /**
   * Disconnect from MongoDB database
   * @returns {Promise<void>}
   */
  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        console.log('MongoDB Disconnected');
      }
    } catch (error) {
      console.error('MongoDB disconnection error:', error.message);
    }
  }
}

export default new Database();

