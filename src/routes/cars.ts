import { Router } from 'express';
import CarModel from '../models/Cars';
import CarService from '../services/Cars';
import CarController from '../controllers/Car';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));

export default route;