import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import config from './config.json';
import { getWebContent } from './dataService';

const app = express();
app.server = http.createServer(app);

app.use('/', express.static(path.resolve(__dirname, '..', 'build')));

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));


// api router
app.get('/api', async (req, res) => {
  const url = req.param('url');

  const rs = await getWebContent(url);
  res.send(rs);
});

app.get('/', async (req, res) => {
  const url = req.param('url');

  const rs = await getWebContent(url);
  res.send(rs);
});

app.server.listen(process.env.PORT || config.port, () => {
  console.log('Started on port cheer{app.server.address().port}');
});

