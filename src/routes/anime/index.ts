import { Router } from 'express';
import getAll from '../../controller/anime/GetAllAnimes';
import getByName from '../../controller/anime/GetOneAnimeByName';
import getCard from '../../controller/anime/GetCardInformationsByName';
import getRandomCard from '../../controller/anime/GetRandomCardInformations';
import createAnime from '../../controller/anime/CreateAnime';
import deleteAnime from '../../controller/anime/DeleteAnime';
import { upload } from '../../utils/upload';

const routes = Router();

routes.get('/anime', getAll);
routes.get('/anime/:name', getByName);
routes.get('/anime/card/random', getRandomCard);
routes.get('/anime/card/:name', getCard);

routes.post('/anime', upload.fields([]), createAnime);

routes.delete('/anime/:name', deleteAnime);




routes.post('/test',upload.single('card'),(req,res)=>{
  res.send(req.file)
})
export default routes;
