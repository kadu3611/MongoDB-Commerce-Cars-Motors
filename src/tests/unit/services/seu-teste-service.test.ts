// template para criação dos testes de cobertura da camada de model
import { ZodError } from 'zod';
import { expect } from 'chai';
import { ErrorTypes } from '../../../errors/catalog';
import CarSchema from "../../../models/CarsModels"
import sinon from "sinon";
import { carMockCreate, carMoksResults } from "../moks/carMock";
import CarsService from '../../../services/CarsService';


describe(' Card Model', () => {
    const carModel = new CarSchema();
    const carService = new CarsService(carModel);
   before(() => {
    sinon.stub(carModel, 'create').resolves(carMoksResults);
    sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMoksResults) 
			.onCall(1).resolves(null) 
    sinon.stub(carModel, 'read').resolves([carMoksResults]);

   });

	after(() => {
		sinon.restore();
	});

    describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carService.create(carMockCreate)

			expect(newCar).to.be.deep.equal(carMoksResults);
		});
        it('Failure', async () => {
			let error;
			try {
				await carService.create({});
			} catch (err) {
				error = err
			}
			expect(error).to.be.instanceOf(ZodError);

	});
    describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carService.readOne('6356f04b73c43036d3bf07d4');
			expect(carFound).to.be.deep.equal(carMoksResults);
		});
        it('Failure', async () => {
			let error;
			try {
				await carService.readOne(carMoksResults._id);
			} catch (err) {
				error = err
			}
			expect(error, 'error should be defined').not.to.be.undefined;
        });
	});
});

    describe('searching all car', () => {
    it('successfully found', async () => {
        const newCar = await carService.create(carMockCreate);
        const [allCar] = await carService.read();
        
        expect(allCar).to.be.deep.equal(newCar);
    });
});
});