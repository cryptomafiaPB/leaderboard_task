import express from 'express';
import userRoutes from './routes/user.route';
import claimRoutes from './routes/claim.route';
import leaderboardRoutes from './routes/leaderboard.route';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/users', claimRoutes);    // mount claim under users
app.use('/api/leaderboard', leaderboardRoutes);

// global error handler
app.use(errorHandler);

export default app;