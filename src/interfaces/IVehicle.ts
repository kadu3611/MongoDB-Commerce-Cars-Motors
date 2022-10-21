import { z } from 'zod';

const Vehicle = z.object({
  model: z.string().min(3, { message: 'Deve ter pelo menos 3 caracteres' }),
  // Marca e/ou modelo do veículo. Deve ser uma string com, pelo menos, 3 caracteres
  year: z.number().min(1900, { message: 'Maio que 1900' }).max(2022, {
    message: 'Maior que 2022' }),
  // Ano de fabricação do veículo. Deve ser um valor inteiro positivo maior ou igual a 1900, porém menor ou igual a 2022
  color: z.string().min(3, { message: 'Deve ter pelo menos 3 caracteres' }),
  // Cor principal do veículo. Deve ser uma string com, pelo menos, 3 caracteres
  status: z.optional(z.boolean()),
  // Status que define se um veículo pode ou não ser comprado. Deve receber valores booleanos e deve ser opcional
  buyValue: z.number(),
  // Valor de compra do veículo. Deve receber apenas números inteiros
});
type IVehicle = z.infer<typeof Vehicle>;

export default IVehicle;

export {
  IVehicle,
};