const error = {
  nameEmpty: '"name" is required',
  nameLength: '"name" length must be at least 5 characters long',
  nameExist: 'Product already exists',
  quantityEmpty: '"quantity" is required',
  quantIntLargerThanZero: '"quantity" must be a number larger than or equal to 1',
};

const empty = (value) => (!value);
const emptyQuantity = (value) => (value === undefined);
const nameLength = (value, min) => (value.length < min);
const IntegerLargerZero = (value) => (!Number.isInteger(value) || value < 1);

const validate = (name, quantity) => {
  switch (true) {
    case empty(name): return { code: 400, message: error.nameEmpty };
    case nameLength(name, 5): return { code: 422, message: error.nameLength };
    case emptyQuantity(quantity): return { code: 400, message: error.quantityEmpty };
    case IntegerLargerZero(quantity): return { code: 422, message: error.quantIntLargerThanZero };
    default: return {};
  }
};

module.exports = {
  validate,
};
