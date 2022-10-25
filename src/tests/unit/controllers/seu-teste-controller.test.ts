import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { carMockCreate, carMoksResults } from "../moks/carMock";
import CarController from '../../../controllers/CarController';
import CarService from '../../../services/CarsService';
import CarSchema from "../../../models/CarsModels"


describe('Car Controller', () => {
  const carModel = new CarSchema()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockCreate);
    sinon.stub(carService, 'readOne').resolves(carMockCreate);
    sinon.stub(carService, 'read').resolves([carMockCreate]);


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMockCreate;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockCreate)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: carMoksResults._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockCreate)).to.be.true;
    });
  });

  describe('Read Car', () => {
    it('Success', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockCreate])).to.be.true;
    });
  });
});