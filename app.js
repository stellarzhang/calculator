const calcWidth = 455;
const calcHeight = 520;

//extra border width that accounts for div being too wide for container
const borderAllowance = 15;

const calculator = document.querySelector('#calculator');
//the div has to have some sort of concrete content (text/pics, not just
//other blank divs) in order to be selected
calculator.style.width = calcWidth + 'px';
calculator.style.height = calcHeight + 'px';
//calculator.style.backgroundColor = 'lightgray';
calculator.style.border = '2px solid lightblue';
calculator.style.backgroundColor = 'aliceblue'
calculator.style.fontFamily = 'helvetica';
const screen = document.querySelector('#screen');

//screen is 1/4 height of calc
screen.style.height = calcHeight / 4 + 'px';
screen.style.width = calcWidth;
screen.textContent = "0";
screen.style.borderColor = 'blue';
screen.style.textAlign = 'right';
screen.style.backgroundColor = 'white';

const screenText = document.querySelector("#screenText");

//TODO fix the padding and margins etc on calc so numbers dont wiggle

//div containing numbers and operations buttons
const lowerCalculator = document.querySelector("#lowerCalculator");
lowerCalculator.style.flexWrap = 'wrap';
lowerCalculator.style.display = 'flex';

//TODO the error is that its dividing 400px by a num. find a way to
//parse out the px
const buttonSize = calcWidth / 5 + 'px';

//numbers contains 0-9, ".", and "="
const numbers = document.querySelector('#numbers');
//numbers/operations are 3/4 height of calc
numbers.style.height = calcHeight * (3/4) + 'px';
numbers.style.width = calcWidth * (3/4) + borderAllowance + 'px';
numbers.style.flexWrap = 'wrap';
numbers.style.display = 'flex';



for (let i = 1; i < 10; i++) {
    const num = document.createElement('div');
    num.setAttribute('id', 'num' + i);
    num.className = 'numbers buttons operands';
    num.textContent = i;
    //this line removes it from memory and makes it permanent
    numbers.appendChild(num);
    
}

const zero = document.createElement('div');
zero.setAttribute('id', 'zero');
zero.className = 'numbers buttons operands';
zero.textContent = '0';

const decimal = document.createElement('div');
decimal.setAttribute('id', 'decimal');
decimal.className = 'numbers buttons operands';
decimal.textContent = '.';

const equals = document.createElement('div');
equals.setAttribute('id', 'equals');
equals.className = 'numbers buttons';
equals.textContent = '=';

//appendChild error happened bc i was trying to append the string '#num7'
//instead of the actual node
//this line puts the numbers in the correct order
numbers.appendChild(document.querySelector('#num7'));
numbers.appendChild(document.querySelector('#num8'));
numbers.appendChild(document.querySelector('#num9'));
numbers.appendChild(document.querySelector('#num4'));
numbers.appendChild(document.querySelector('#num5'));
numbers.appendChild(document.querySelector('#num6'));
numbers.appendChild(document.querySelector('#num1'));
numbers.appendChild(document.querySelector('#num2'));
numbers.appendChild(document.querySelector('#num3'));

numbers.appendChild(zero);
numbers.appendChild(decimal);
numbers.appendChild(equals);

const operations = document.querySelector('#operations');
operations.style.width = calcWidth - 
    (numbers.style.width.substring(0,numbers.style.width.length - 2) + 
    borderAllowance) + 'px';

const divide = document.querySelector('#divide');
divide.className = 'numbers buttons operator';
divide.textContent = '/';

const multiply = document.querySelector('#multiply');
multiply.className = 'numbers buttons operator';
multiply.textContent = '*';

const minus = document.querySelector('#minus');
minus.className = 'numbers buttons operator';
minus.textContent = '-';

const plus = document.querySelector('#plus');
plus.className = 'numbers buttons operator';
plus.textContent = '+';

const buttons = document.querySelectorAll('div.buttons');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.width = buttonSize;
    buttons[i].style.height = buttonSize;
    buttons[i].style.textAlign = "center";
    buttons[i].style.backgroundColor = "white";
    buttons[i].style.border = "1px solid transparent";
    buttons[i].style.margin = '2px';
    buttons[i].style.lineHeight = buttonSize;
    buttons[i].addEventListener('mouseover', function(e) {
        //TODO im guessing the border margins are causing the calc 
        //to mess up the width
        buttons[i].style.border = '1px solid lightblue';
    })
    buttons[i].addEventListener('mouseout', function(e) {
        buttons[i].style.border = '1px solid transparent';
    })
}

//TODO clean up this code. make it neat by adding classnames and mass
//modifying size/color through class name

//add all subdivs to main calc div
lowerCalculator.appendChild(numbers);
lowerCalculator.appendChild(operations);
calculator.appendChild(screen);
calculator.appendChild(lowerCalculator);

//putting together the aesthetics of the calc
//-------------------------------------------------------------------
//adding functionality of calc
//both operands of equation
let operand1;
let operand2;
//what operation between those two operands
let operator;
//determines if you're adding digits for first or second operand
let firstOperand = true;
//the most recent operator pressed
let currentOperator;
let answer;


//TODO when i already have an answer on screen and i hit the second operand,
//screen changes to show operand digit twice.
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
        //get the first operand
        //the bug with className is bc it was comparing all 3 
        //classnames instead of one. 
        if (buttons[i].className.indexOf("operands") != -1 && firstOperand) {
            //appends the newest digit to end of string, parsing out "num" from id
            //null == undefined, thus this catches if the variable
            //is either null or undefined
            //operands are null if they haven't had a number set to them yet
            if (operand1 == null) {
                operand1 = buttons[i].id.substring(3,buttons[i].id.length);
            } else {
                operand1 = operand1 + "" + 
                    buttons[i].id.substring(3,buttons[i].id.length);  
            }
            screen.textContent = operand1;

        //get the second operand, parsing out "num" from id
        //you know its the second operand bc if the user hits an operator,
        //then the next digit has to be the second operand
        } else if (buttons[i].className.indexOf("operands") != -1 && !firstOperand) {
            if (operand2 == null) {
                operand2 = buttons[i].id.substring(3,buttons[i].id.length);
                //TODO code does not enter here second time around
            } else {
                //TODO second operation around, the code goes here when 
                //pressing 2nd operand
                operand2 = operand2 + "" + 
                    buttons[i].id.substring(3,buttons[i].id.length);
            }
            //TODO the bug: I think for the second operation, its 
            //concatenating the old answer with the new digit.
            //the bug: its adding the digits of the first answer, but 
            //concatenating the digits of the second operand to that
            screen.textContent = operand2;
        } else if (buttons[i].className.indexOf("operator") != -1) {
            firstOperand = false;
            if (buttons[i].id == "plus") {
                currentOperator = "plus";
            } else if (buttons[i].id == "minus") {
                currentOperator = "minus";
            } else if (buttons[i].id == "multiply") {
                currentOperator = "multiply";
            } else {
                //divide
                currentOperator = "divide";
            }
            //alert("operator button pressed");
        } else if (buttons[i].id == "equals") {
            //if they pressed equals
            //used unary operator + to convert strings to numbers
            //bug is because this branch is included under equals branch,
            //thus the only button it knows was pressed is "equals"
            //resolve by making a variable that holds the current operator
            if (currentOperator == "plus") {
                answer = +operand1 + +operand2;
            } else if (currentOperator == "minus") {
                answer = +operand1 - +operand2;
            } else if (currentOperator == "multiply") {
                answer = +operand1 * +operand2;
            } else if (currentOperator == "divide") {
                //the operator1 + operator2 bug was because the code
                //was traveling down this else path. fixed by clarifying 
                //this path as the divide path

                //if they pressed divide
                if (operand2 == 0) {
                    alert("Cannot divide by 0!");
                } else {
                    answer = +operand1 / +operand2;
                }
                
            }
            screen.textContent = answer;
            //set firstOperand to true to let user pick new calculation
            firstOperand = true;
            //if the user chooses the current answer on screen as first 
            //operand, then this is an option.
            //bug: instead of operand1 and 2, I accidentally wrote operator1 and 2
            operand1 = answer;
            //reset value of operator2
            operand2 = null;
        }
    })
}