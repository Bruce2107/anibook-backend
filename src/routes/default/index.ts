import { Router } from 'express';
import { join } from 'path';
const routes = Router();

routes.get('/', (_, res) => {
  res.sendFile(join(__dirname, '../../../public/index.html'));
});
export default routes;
