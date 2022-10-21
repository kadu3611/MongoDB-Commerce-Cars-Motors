import { Router } from 'express';

const route = Router();

route.post('/cars', (req, res) => res.send('estamos aqui'));

export default route;