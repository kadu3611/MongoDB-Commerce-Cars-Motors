import { Router } from 'express';
import CarModel from '../models/CarsModels';
import CarService from '../services/CarsService';
import CarController from '../controllers/CarController';
import MotoController from '../controllers/MotorciclyController';
import MotorSchema from '../models/MotorciclyModel';
import MotoService from '../services/MotoService';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

const moto = new MotorSchema();
const motoService = new MotoService(moto);
const motoController = new MotoController(motoService);

const motoIdRoute = '/motorcycles/:id';
const carIdRoute = '/cars/:id';

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.get(carIdRoute, (req, res) => carController.readOne(req, res));
route.put(carIdRoute, (req, res) => carController.update(req, res));
route.delete(carIdRoute, (req, res) => carController.delete(req, res));
route.post('/motorcycles', (req, res) => motoController.create(req, res)); // motorcycles
route.get('/motorcycles', (req, res) => motoController.read(req, res));
route.get(motoIdRoute, (req, res) => motoController.readOne(req, res));
route.put(motoIdRoute, (req, res) => motoController.update(req, res));
route.delete(motoIdRoute, (req, res) => motoController.delete(req, res));

export default route;