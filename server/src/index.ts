import express from 'express';
import { 
  getTVShowMetadataByTVID,
  getSimilarTVShowsByTVID,
  getTVRecommendationsByTVID
} from './api/theMovieDB';

const router = express();
const PORT = 3002;

// Root route
router.get('/', (req, res) => {
  res.send("Why are you here?");
});

// Utility
router.get('/tv/:id', async (req, res) => {
  const result = await getTVShowMetadataByTVID(Number(req.params.id));
  res.send(result);
});

router.get('/tv/:id/similar', async (req, res) => {
  const result = await getSimilarTVShowsByTVID(Number(req.params.id));
  res.send(result);
});

router.get('/tv/:id/recommendations', async (req, res) => {
  const result = await getTVRecommendationsByTVID(Number(req.params.id));
  res.send(result);
});

// Listen on port 3002.
router.listen(PORT, () => {
  console.log(`server running : http://localhost:${PORT}`);
});