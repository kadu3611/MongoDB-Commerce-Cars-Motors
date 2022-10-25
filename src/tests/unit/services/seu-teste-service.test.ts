// template para criação dos testes de cobertura da camada de model
import { ZodError } from 'zod';
import { expect } from 'chai';
import CarSchema from "../../../models/CarsModels"
import sinon from "sinon";
import { carMockCreate, carMoksResults } from "../moks/carMock";
import CarsService from '../../../services/CarsService';
import MotorSchema from '../../../models/MotorciclyModel';
import MotoService from '../../../services/MotoService';
import { motoMockCreate, motoMoksResults } from "../moks/motoMocks";

describe(' Card Model', () => {
    const carModel = new CarSchema();
    const carService = new CarsService(carModel);
// --------------------------------------------------- //

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

describe(' Moto Model', () => {

    const motoModel = new MotorSchema();
    const motoService = new MotoService(motoModel);
   before(() => {
    sinon.stub(motoModel, 'create').resolves(motoMoksResults);
    sinon.stub(motoModel, 'readOne')
			.onCall(0).resolves(motoMoksResults) 
			.onCall(1).resolves(null) 
    sinon.stub(motoModel, 'read').resolves([motoMoksResults]);
    sinon.stub(motoModel, 'update').resolves(motoMoksResults);

   });

	after(() => {
		sinon.restore();
	});

    describe('creating a Moto', () => {
		it('successfully created', async () => {
			const newCar = await motoService.create(motoMockCreate)

			expect(newCar).to.be.deep.equal(motoMoksResults);
		});
        it('Failure', async () => {
			let error;
			try {
				await motoService.create({});
			} catch (err) {
				error = err
			}
			expect(error).to.be.instanceOf(ZodError);
	});
});
describe('searching a Moto', () => {
	it('successfully found', async () => {
		const motoFound = await motoService.readOne('4edd40c86762e0fb12000003');
		expect(motoFound).to.be.deep.equal(motoMoksResults);
	});
	it('Failure', async () => {
		let error;
		try {
			await motoService.readOne(motoMoksResults._id);
		} catch (err) {
			error = err
		}
		expect(error, 'error should be defined').not.to.be.undefined;
	});
});

describe('searching all motorcicly', () => {
    it('successfully found', async () => {
        const newMoto = await motoService.create(motoMockCreate)
        const [allMoto] = await motoService.read();
        
        expect(allMoto).to.be.deep.equal(newMoto);
    });
});

describe('update motorcicly', () => {
    it('successfully found', async () => {
        const newMoto = await motoService.update(motoMoksResults._id, motoMockCreate)
		
        expect(newMoto).to.be.deep.equal(motoMoksResults);
    });
});
});


