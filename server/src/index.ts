import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { 
  getTVShowMetadataByTVID,
  getSimilarTVShowsByTVID,
  getTVRecommendationsByTVID,
  getTVShowReviewsByTVID,
  getTVShowDetailsByQueryGeneral,
  getMultipleTVShowsMetadataByTVIDs
} from './api/theMovieDB';

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Root route
app.get('/', (req, res) => {
  res.json({msg: 'Why are you here? 10 points from Gryffindor!', status_code: 200});
});

// Testing route
app.get('/api/test', (req, res) => {
  res.json({msg: 'Proxy is functional!', status_code: 200});
});

/////////////////////////////
// TMDB ID-Based endpoints //
/////////////////////////////
app.get('/api/tv/:id', async (req, res) => {
  const result = await getTVShowMetadataByTVID(Number(req.params.id));
  res.json(result);
});

app.get('/api/tv/:id/similar', async (req, res) => {
  const result = await getSimilarTVShowsByTVID(Number(req.params.id));
  res.json(result);
});

app.get('/api/tv/:id/recommendations', async (req, res) => {
  const result = await getTVRecommendationsByTVID(Number(req.params.id));
  res.json(result);
});

app.get('/api/tv/:id/reviews', async (req, res) => {
  const result = await getTVShowReviewsByTVID(Number(req.params.id));
  res.json(result);
});

///////////////////////////////////
// TMDB ID-Based endpoints (RPC) //
///////////////////////////////////
app.post('/api/rpc/tv', async (req, res) => {
  const { ids } = req.body;
  const result = await getMultipleTVShowsMetadataByTVIDs(ids);
  res.json(result);
});

////////////////////////////////
// TMDB Query-Based endpoints //
////////////////////////////////
/* Note - The client must send the query as a URI-encoded string. */
app.get('/api/search/tv/:query', async (req, res) => {
  const result = await getTVShowDetailsByQueryGeneral({ query: req.params.query });
  res.json(result);
});

// Listen on port 3002.
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});