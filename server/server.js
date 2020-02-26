import express from 'express';
import logger from 'morgan';
import parser from 'body-parser';
import routes from './routes/index';


const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 8000;


app.set('port', port);

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
routes(router);

app.use('/api/v1/', router);

app.get('*', (req, res) => res.status(404).json({
  message: 'Invalid Url',
}));

app.listen(port, () => console.log(`Port running at ${port}`));

export default app;
