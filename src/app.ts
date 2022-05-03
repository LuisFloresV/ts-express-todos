import express from 'express';
import todoRoutes from './routes/todos.ts';

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

app.use((err: Error, req: express.Request, res: express.Response) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
