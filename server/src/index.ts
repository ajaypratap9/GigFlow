import app from './app';
import { connectDB } from './config/db';

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to MongoDB, starting without DB:', error);
  }
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();