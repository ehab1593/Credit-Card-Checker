// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

//Task 1: Look over the starter code. There are 15 arrays that each contain the digits of separate credit card numbers. They all have prefixes to reflect their status, i.e. variables that start with valid contain a valid number, whereas invalid do not, and mystery variables can be either. There is also a batch array that stores all of the provided credit cards in a single array.
//You’ll use these arrays later to check if your functions are working properly.
//Create a function, validateCred() that has a parameter of an array. The purpose of validateCred() is to return true when an array contains digits of a valid credit card number and false when it is invalid. This function should NOT mutate the values of the original array.
//Starting from the farthest digit to the right, AKA the check digit, iterate to the left.
//As you iterate to the left, every other digit is doubled (the check digit is not doubled). If the number is greater than 9 after doubling, subtract 9 from its value.
//Sum up all the digits in the credit card number.
//If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it’s invalid.

const validateCred = (array) => {
  const newArray = array.slice(0, -1); 
  const checkDigit = array[array.length - 1]; // Store the last digit
  newArray.reverse(); // Reverse the array

  // Double every other digit
  for (let i = 0; i < newArray.length; i++) {
    if (i % 2 === 0) { // Corrected condition
      newArray[i] *= 2;
      if (newArray[i] > 9) {
        newArray[i] -= 9;
      }
    }
  }

  // Sum all the digits including the check digit
  let sum = checkDigit;
  for (let i = 0; i < newArray.length; i++) {
    sum += newArray[i];
  }

  // Check if the sum modulo 10 is 0
  return sum % 10 === 0


};


//Task 2. Create another function, findInvalidCards() that has one parameter for a nested array of credit card numbers. 
//The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.

const findInvalidCards = (nestedArray) => {
  const allInvalidCards = [];
  nestedArray.forEach(card => {
    if(!validateCred(card)) {
      allInvalidCards.push(card);
    }
  });
  return allInvalidCards;
  }

console.log(validateCred(valid3)); // Should return true

const invalidCards =findInvalidCards(batch);

// Task 3 Checking which companies have issued invalid cards without repeating them on the nested array 

const idInvalidCardCompanies = (nestedArray) => {
  const arrayCompanies = [];
    nestedArray.forEach(card => {
      switch(card[0]) {
        case 3:
        if(!arrayCompanies.includes('Amex')) {
          arrayCompanies.push('Amex');
        }
        break;

        case 4: 
        if(!arrayCompanies.includes('Visa')) {
          arrayCompanies.push('Visa');
        }
        break;

        case 5:
        if (!arrayCompanies.includes('Mastercard')) {
          arrayCompanies.push('Mastercard');
        }
        break;

        case 6:
        if(!arrayCompanies.includes('Discover')) {
          arrayCompanies.push('Discover');
        }
        break;
        default: console.log('Company not found.');
      }

      
    });
    return arrayCompanies;
  }

console.log(idInvalidCardCompanies(invalidCards));

