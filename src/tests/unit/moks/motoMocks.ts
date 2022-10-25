import { IMotorcycle } from "../../../interfaces/IMotorcycle"

const motoMockCreate:IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
  }

  const motoMoksResults:IMotorcycle & { _id: string } = {
    _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
  }

  export {
    motoMockCreate,
    motoMoksResults
  }
