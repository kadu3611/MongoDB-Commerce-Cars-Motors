import ICar from "../../../interfaces/ICar"

const carMockCreate:ICar = {
    "model": "nada",
    "year": 2022,
    "color": "Yellow",
    "buyValue": 5,
    "doorsQty": 2,
    "seatsQty": 2,
  }

  const carMoksResults:ICar & { _id: string } = {
    "model": "nada",
    "year": 2022,
    "color": "Yellow",
    "buyValue": 5,
    "doorsQty": 2,
    "seatsQty": 2,
    "_id": "6356f04b73c43036d3bf07d4"
  }

  export {
    carMockCreate,
    carMoksResults
  }
