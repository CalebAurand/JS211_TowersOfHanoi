'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


// Start here. What is this function doing?
// use bracket notation such as stacks['a']
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
/**
 * This method should assume tha tthe proposed move is legal,
 * and move the pieces accordingly
 * @param {string} startStack - the name of the stack they want to move the piece from
 * @param {string} endStack - the name of the stack they want to move the piece to
 */
const movePiece = (startStack, endStack) => {
  // Your code here
  // console.log(`startStack parameter is ${startStack}`);

  //*1 = store position of last piece
  let startArray = stacks[startStack];
  let endArray = stacks[endStack];

  // check to see if accessing starting array
  // console.log('startArray tis :'+startArray); 

  let startLength = startArray.length;
  let pos = startLength - 1;
  // console.log(`length of stack ${startStack} is ${startLength} 
  // position of last item is ${pos}`)
  
  // store value of last number in first stack
  let lastPiece = startArray[pos];

  // console.log(`last piece in ${startStack} is size ${lastPiece}`); //check if last piece is stored properly
  // remove last piece from startStack
  startArray.pop();
  // place last piece on endStack
  endArray.push(lastPiece);
}

// Before you move, should you check if the move is actually allowed? Should 3 be able to be stacked on 2
/**
 * This function should return true if the proposed move is legal,
 * or false if the proposed move is not legal.
 * Note: This method should not change the board,
 *       it is only checking if the move is legal or not
 * @param {string} startStack - the name of the stack they want to move the piece from
 * @param {string} endStack - the name of the stack they want to move the piece to
 */

const isLegal = (startStack, endStack) => {
  // Your code here
  let startArray = stacks[startStack];
  let endArray = stacks[endStack];
  /**
   * starting stacks cannot be empty... .length != 0
   */
   let startLength = startArray.length;

   //set start position for comparison
   let posA = startLength - 1;
   let endLength = endArray.length;

   // set end position for comparison
   let posB = 0;
   if (endLength > 0){
     posB = endLength - 1;
   }else{
     posB = endLength;
   };

   let pieceA = startArray[posA];
   let pieceB = 0;
   if(endLength!=0){
     pieceB = endArray[posB];
   }else{
     pieceB=0;
   };

   if((pieceA < pieceB) && !(startLength > 4) && !(startLength === 0) && !(endLength < 0) && !(endLength > 4)){
     return true;
   }else if(pieceA > 0 && pieceB ===0){
     return true;
   }else{
     return false
   };

};

// What is a win in Towers of Hanoi? When should this function run?
/**
 * 
 * this method checks if the player won, and returns true if they won,
 * otherwise returns false
 * @param {string} startStack - the name of the stack they want to move the piece from
 * @param {string} endStack - the name of the stack they want to move the piece to
 */
const checkForWin = () => {
  // Your code here
  let arrB = stacks['b'];
  let arrC = stacks['c'];
  arrB = arrB.join(); // creates a string of the array in b for easy comparison
  arrC = arrC.join(); // creates a string of the array in c for easy comparison
  // console.log(`checkForWin is running arrB is ${arrB} arrC is ${arrC}`);

  //if array B has value '4,3,2,1' that is a win, return true
  if(arrB === '4,3,2,1'){
    // console.log(`first if statement is running arrB is ${arrB}`)
    return true;
  }else if(arrC === '4,3,2,1'){
    // console.log(`second if statement is running arrC is ${arrC}`)
    return true; // array C has values [4, 3, 2, 1] that is a win, return true
  }else{
    // console.log(`if statements were skipped in checkForWin`);
    return false;
  };
  //else return false
}

// When is this function called? What should it do with its argument?
/**
 * Should check that the move is legal,
 * if the move is legal, then process it,
 * after the move has been processed, check if the player won.
 * If they player won, let them know.
 * @param {string} startStack - the name of the stack they want to move the piece from
 * @param {string} endStack - the name of the stack they want to move the piece to
 */
const towersOfHanoi = (startStack, endStack) => {
  // Your code here

  //call the isLegal function to check if move is valid to make
  isLegal(startStack, endStack);
  //call the movePiece function to move thepiece
  if(isLegal(startStack, endStack)){
    movePiece(startStack, endStack);
  };
  //call the checkForWin function to check for a win
  // checkForWin();
  if(checkForWin() == true){
    console.log(`Congratulations you have won!`);
    return;
  };
};

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      if(checkForWin()==true){return;};
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
