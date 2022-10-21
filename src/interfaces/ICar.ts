import { z } from 'zod';
import { Vehicle } from './IVehicle';

const Car = Vehicle.extend({
  doorsQty: z.number().positive().int().gte(2)
    .lte(4),
  // Quantidade de portas de um carro. Deve ser um valor inteiro positivo maior ou igual a 2 e menor ou igual a 4
  seatsQty: z.number().gte(2).lte(7),
  // Quantidade de assentos disponíveis no carro. Deve ser maior ou igual a 2 e menor ou igual a 7
});

type ICar = z.infer<typeof Car>;

export default ICar;

export {
  ICar,
  Car,
};
