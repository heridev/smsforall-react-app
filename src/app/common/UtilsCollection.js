import _ from '@lodash';

export const findFieldByValueOnCollection = (fieldName, searchedValue, collection) => {
  return _.find(collection, { [fieldName]: searchedValue });
};

export const hasValidationErrors = (hashObject, fieldName) => {
  return _.find(hashObject, function (value, key) {
    if (key === fieldName) {
      return true;
    }
  });
};

export const showValidationErrorMessage = (hashObject, fieldName) => {
  return _.find(hashObject, function (value, key) {
    if (key === fieldName) {
      return value;
    }
  });
};
