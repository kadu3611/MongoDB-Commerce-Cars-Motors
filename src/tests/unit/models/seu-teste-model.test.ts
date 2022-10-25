// template para criação dos testes de cobertura da camada de model

import { expect } from 'chai';
import CarSchema from "../../../models/CarsModels"
import { Model } from 'mongoose';
import sinon from "sinon";
import { NextFunction, Request, Response } from 'express';
import { carMockCreate, carMoksResults } from "../moks/carMock";
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarController';

describe(' Card Controller', () => {
    const carModel = new CarSchema();
	const carService = new CarsService(carModel);
	const carController = new CarsController(carService);
	// fazemos o cast de um objeto para um `Request` pois nosso controller só vai aceitar um objeto do tipo `Request` como primeiro parâmetro
	const req = {} as Request; 
	// o mesmo acontece com o segundo parâmetro
	const res = {} as Response;
  
   before(() => {
    sinon.stub(Model, 'create').resolves(carMoksResults);
    sinon.stub(Model, 'findOne').resolves(carMoksResults);
    sinon.stub(Model, 'find').resolves([carMoksResults]);

	res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

   });

	after(() => {
		sinon.restore();
	});

    describe('creating a car', () => {
		it('successfully created', async () => {
			req.body = carMockCreate
			await carController.create(req, res);

			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(carMoksResults)).to.be.true;
		});
	});
    describe('searching a car', () => {
		it('successfully found', async () => {
			req.params = { id: carMoksResults._id };
			carController.readOne(req, res);
			expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
			expect((res.json as sinon.SinonStub).calledWith(carMoksResults)).to.be.true;


		});
        // it('_id not found', async () => {
		// 	try {
		// 		await carModel.readOne('123ERRADO');
		// 	} catch (error: any) {
		// 		expect(error.message).to.be.eq('InvalidMongoId');
		// 	}
		// });
});

});



//     describe('searching all car', () => {
//     it('successfully found', async () => {7
//         const newCar = await carModel.create(carMockCreate);
//         const [allCar] = await carModel.read();
        
//         expect(allCar).to.be.deep.equal(newCar);
//     });
// });
// });