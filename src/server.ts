import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Configuration object
const config = {
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL,
};

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB connection and server start
async function main() {
  try {
    if (!config.database_url) {
      throw new Error('DATABASE_URL is not defined.');
    }

    await mongoose.connect(config.database_url);
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Start the server
main();
