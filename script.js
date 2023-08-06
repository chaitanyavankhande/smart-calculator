const calcButtons = document.querySelectorAll(".calc-button");

function changeBgColorMousePressedDown() {
  this.style.backgroundColor = "rgb(134, 59, 185)";
}

function changeBgColorMouseReleased() {
  this.style.backgroundColor = "rgb(37, 11, 54)";
}

calcButtons.forEach((element) => {
  element.addEventListener("mousedown", changeBgColorMousePressedDown);
  element.addEventListener("mouseup", changeBgColorMouseReleased);
});

let resultElement = document.getElementById("resultElement");

let zero = document.getElementById("zero");
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let four = document.getElementById("four");
let five = document.getElementById("five");
let six = document.getElementById("six");
let seven = document.getElementById("seven");
let eight = document.getElementById("eight");
let nine = document.getElementById("nine");

let addDigitToresultElement = function (digit) {
  let expression = resultElement.innerHTML;
  if (expression[expression.length - 1] === ")") return;
  if(expression.length == 1 && expression === '0') expression = '';
  resultElement.innerHTML = expression + digit;
};
zero.addEventListener("click", function () {
  addDigitToresultElement("0");
});
one.addEventListener("click", function () {
  addDigitToresultElement("1");
});
two.addEventListener("click", function () {
  addDigitToresultElement("2");
});
three.addEventListener("click", function () {
  addDigitToresultElement("3");
});
four.addEventListener("click", function () {
  addDigitToresultElement("4");
});
five.addEventListener("click", function () {
  addDigitToresultElement("5");
});
six.addEventListener("click", function () {
  addDigitToresultElement("6");
});
seven.addEventListener("click", function () {
  addDigitToresultElement("7");
});
eight.addEventListener("click", function () {
  addDigitToresultElement("8");
});
nine.addEventListener("click", function () {
  addDigitToresultElement("9");
});

var operatorsList = ["+", "-", "*", "/", "%"];
let clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  resultElement.innerHTML = "0";
});
let brackets = document.getElementById("brackets");
brackets.addEventListener("click", function () {
  let expression = resultElement.innerHTML;
  if (operatorsList.includes(expression[expression.length - 1])) {
    resultElement.innerHTML = resultElement.innerHTML + "(";
    return;
  }
  let openBrackets = 0,
    closeBrackets = 0;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "(") openBrackets++;
    if (expression[i] === ")") closeBrackets++;
  }
  if (
    openBrackets > closeBrackets &&
    expression[expression.length - 1] !== "("
  ) {
    resultElement.innerHTML = expression + ")";
  }
});

let enterOperator = function (newOperator) {
  let expression = resultElement.innerHTML;

  if (newOperator !== "-" && expression[expression.length - 1] === "(" || expression[expression.length - 1] === ".") return;

  if (
    expression[expression.length - 1] === "-" &&
    expression[expression.length - 2] === "("
  )
    return;
  if (operatorsList.includes(expression[expression.length - 1])) {
    resultElement.innerHTML =
      expression.substring(0, expression.length - 1) + newOperator;
  } else {
    resultElement.innerHTML = expression + newOperator;
  }
};

let operatorModulo = document.getElementById("operator-modulo");
operatorModulo.addEventListener("click", function () {
  enterOperator("%");
});

let operatorDivide = document.getElementById("operator-divide");
operatorDivide.addEventListener("click", function () {
  enterOperator("/");
});

let operatorMultiply = document.getElementById("operator-multiply");
operatorMultiply.addEventListener("click", function () {
  enterOperator("*");
});

let operatorSubtract = document.getElementById("operator-subtract");
operatorSubtract.addEventListener("click", function () {
  enterOperator("-");
});

let operatorAdd = document.getElementById("operator-add");
operatorAdd.addEventListener("click", function () {
  enterOperator("+");
});

let backspace = document.getElementById("backspace");
backspace.addEventListener("click", function () {
  let expression = resultElement.innerHTML;
  if (expression.length === 1) return;
  resultElement.innerHTML = expression.substring(0, expression.length - 1);

  expression = resultElement.innerHTML;
  if (expression.length === 1 && expression === "-")
    resultElement.innerHTML = "0";
});

let equals = document.getElementById("equals");
equals.addEventListener("click", function () {
  let expression = resultElement.innerHTML;
  resultElement.innerHTML = eval(expression);
});

let enterDot = function (expression) {
  let lastChar = expression[expression.length - 1];
  if (lastChar === "(" || lastChar === ")") return false;
  if (operatorsList.includes(lastChar)) return false;

  for (let i = expression.length - 1; i >= 0; i--) {
    if (expression[i] === "(" || expression[i] === ")") break;
    if (operatorsList.includes(expression[i])) break;
    if (expression[i] === ".") return false;
  }
  return true;
};

let dot = document.getElementById("dot");
dot.addEventListener("click", function () {
  let expression = resultElement.innerHTML;
  if (enterDot(expression) === false) return;
  resultElement.innerHTML = expression + ".";
});
