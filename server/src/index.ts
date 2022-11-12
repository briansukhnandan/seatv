import express from 'express';
import cors from 'cors';
import { 
  getTVShowMetadataByTVID,
  getSimilarTVShowsByTVID,
  getTVRecommendationsByTVID,
  getTVShowReviewsByTVID
} from './api/theMovieDB';

const app = express();
app.use(cors());
const PORT = 3002;

// Root route
app.get('/api/test', (req, res) => {
  res.json({msg: 'test_message'});
});

// Utility
app.get('/api/tv/:id', async (req, res) => {
  const result = await getTVShowMetadataByTVID(Number(req.params.id));
  res.json(result);
});

app.get('/api/tv/:id/similar', async (req, res) => {
  const result = await getSimilarTVShowsByTVID(Number(req.params.id));
  res.send(result);
});

app.get('/api/tv/:id/recommendations', async (req, res) => {
  const result = await getTVRecommendationsByTVID(Number(req.params.id));
  res.send(result);
});

app.get('/api/tv/:id/reviews', async (req, res) => {
  const result = await getTVShowReviewsByTVID(Number(req.params.id));
  res.send(result);
});

// Listen on port 3002.
app.listen(PORT, () => {
  console.log(`server running : http://localhost:${PORT}`);
});