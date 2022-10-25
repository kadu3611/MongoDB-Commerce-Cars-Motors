import { z } from 'zod';
import { Vehicle } from './IVehicle';

const MotorcycleZod = Vehicle.extend({
  category: z.enum(['Street', 'Custom', 'Trail'] as const),
  engineCapacity: z.number().int().positive().lt(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleZod>;

export {
  IMotorcycle,
  MotorcycleZod,
};