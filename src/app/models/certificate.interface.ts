export interface Certificate {
  productDetails: ProductDetails
  referenceInstrumentation: ReferenceInstrumentation
  temperatureValidation: TemperatureValidation
  environmentConditions: EnvironmentConditions
}

export interface ProductDetails {
  productType: string
  resolution: string
  type: string
  range: string
}

export interface ReferenceInstrumentation {
  model: string
  brand: string
  calibrationDate: string
  accuracy: string
  indicator: string
  sensor: string
}

export interface TemperatureValidation {
  setPoints: string[]
  deviation: string[]
  uncertainty: string[]
}

export interface EnvironmentConditions {
  temperature: string
  humidity: string
}
