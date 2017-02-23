export function validateEmptyField(value) {
  return value != ''
}

export function canSaveString(...arrayToValidate) {
  return arrayToValidate.every(validateEmptyField.bind(this));
}

export function canSaveNumber(...arrayToValidate) {
  return arrayToValidate.every(validateNumber.bind(this));
}

export function validateNumber(value) {
  return (!isNaN(value) && value < Number.MAX_VALUE && value >= 0)
}

export function validateExistenceField(arrayToValidate, valueToValidate){
  return arrayToValidate.some(exist.bind(this, valueToValidate));
}

export function exist(value, valueToValidate){
  return valueToValidate == value;
}
