// #region - Using type inference on variable declarations

let score = 5;

// #endregion

// #region - Using type inference with functions

function add(a: number, b: number) {
  return a + b;
}
  
const ten = add(5, 5);


function addTen(a) {
  return a + 10;
}
const fourteen = addTen(4);

function addTenWithDefaultValue(a = 1) {
  return a + 10;
}

const eleven = addTenWithDefaultValue(1);

// #endregion
