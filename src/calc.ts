//selecting various elements
let btns: NodeList = document.querySelectorAll(".btn");
let number = document.querySelectorAll(".number") as NodeListOf<HTMLDivElement>;
const deg = <HTMLElement>document.querySelector("#degree");
let functionButton: HTMLElement = <HTMLInputElement>(
  document.querySelector(".function-btn")
);
const operator = document.querySelectorAll(
  ".operator"
) as NodeListOf<HTMLDivElement>;
const equal: HTMLElement = document.querySelector("#equal");
let trigoButton: HTMLElement = <HTMLElement>(
  document.querySelector(".trigonometry-function")
);
let second = <HTMLElement>document.querySelector("#secondBtn");
let calScreen = document.querySelector(".calculator-screen") as HTMLElement;
const backspace: HTMLElement = document.querySelector("#backspace");
let clear: HTMLElement = <HTMLElement>document.querySelector("#clear");
//initialize the screen value
let memory: String[] = [];
let i: number = 0;
calScreen.innerHTML = "";
let flag: boolean = false;
// 2nd button
second.addEventListener("click", function () {
  if (!second.classList.contains("color")) {
    second.classList.add("color");
  } else {
    second.classList.remove("color");
  }
  let rowSecond = document.querySelectorAll(".second");
  for (let i = 0; i < rowSecond.length; i++) {
    let firstChild: Element | null = rowSecond[i].firstElementChild;
    let secondChild: Element | null = firstChild.nextElementSibling;
    if (secondChild.classList.contains("hide")) {
      firstChild.classList.add("hide");
      secondChild.classList.remove("hide");
    } else {
      firstChild.classList.remove("hide");
      secondChild.classList.add("hide");
    }
  }
});
function eventList(e: Event) {
  let ch = e.target as HTMLElement;
  let chId = ch.id;
  switch (chId) {
    case "equal":
      if (calScreen.innerHTML.includes("^")) {
        let result = nthroot(calScreen.innerHTML);
        calScreen.innerHTML = String(result);
      } else if (calScreen.innerHTML.includes("%")) {
        calScreen.innerHTML = String(mod(calScreen.innerHTML));
      } else {
        calScreen.innerHTML = String(evaluate(calScreen.innerHTML));
      }
      break;
    case "sin":
      if (flag) {
        calScreen.innerHTML = Math.sin(
          (parseInt(calScreen.innerHTML) * Math.PI) / 180
        ).toPrecision(2);
      } else {
        calScreen.innerHTML = Math.sin(
          parseInt(calScreen.innerHTML)
        ).toPrecision(10);
      }
      break;
    case "cos":
      if (flag) {
        calScreen.innerHTML = Math.cos(
          (parseInt(calScreen.innerHTML) * Math.PI) / 180
        ).toPrecision(2);
      } else {
        calScreen.innerHTML = Math.cos(
          parseInt(calScreen.innerHTML)
        ).toPrecision(10);
      }
      break;
    case "tan":
      if (flag) {
        calScreen.innerHTML = Math.tan(
          (parseInt(calScreen.innerHTML) * Math.PI) / 180
        ).toPrecision(2);
      } else {
        calScreen.innerHTML = Math.tan(
          parseInt(calScreen.innerHTML)
        ).toPrecision(10);
      }
      break;
    case "ceil":
      calScreen.innerHTML = String(Math.ceil(parseFloat(calScreen.innerHTML)));
      break;
    case "floor":
      calScreen.innerHTML = String(Math.floor(parseFloat(calScreen.innerHTML)));
      break;
    case "round":
      calScreen.innerHTML = String(Math.round(parseFloat(calScreen.innerHTML)));
      break;
    case "absolute":
      calScreen.innerHTML = String(Math.abs(parseFloat(calScreen.innerHTML)));
      break;
    case "f-e":
      calScreen.innerHTML = String(
        Math.pow(10, parseFloat(calScreen.innerHTML))
      );
      break;
    case "backspace":
      calScreen.innerHTML = backSpace(calScreen.innerHTML);
      break;
    case "clear":
      //clear the screen
      calScreen.innerHTML = "";
      break;
    case "pi":
      if (calScreen.innerHTML === " ") {
        calScreen.innerHTML = "3.14";
      } else {
        calScreen.innerHTML = String(Math.PI);
      }
      break;
    case "pos-neg":
      if (calScreen.innerHTML === " ") {
        alert("Enter the number for positive and negative ");
      } else {
        calScreen.innerHTML = String(changeSign(calScreen.innerHTML));
      }
      break;
    case "exponential":
      if (calScreen.innerHTML === "") {
        calScreen.innerHTML = "2.718";
      } else {
        calScreen.innerHTML = String(Math.E);
      }
      break;
    case "pow2":
      calScreen.innerHTML = String(Math.pow(parseInt(calScreen.innerHTML), 2));
      break;
    case "denom":
      calScreen.innerHTML = String(1 / parseInt(calScreen.innerHTML));
      break;
    case "mod":
      calScreen.innerHTML += "%";
      break;
    case "root":
      calScreen.innerHTML = String(Math.sqrt(parseInt(calScreen.innerHTML)));
      break;
    case "open-parenthesis":
      calScreen.innerHTML = calScreen.innerHTML + "(";
      break;
    case "close-parenthesis":
      calScreen.innerHTML = calScreen.innerHTML + ")";
      break;
    case "pow":
      calScreen.innerHTML = calScreen.innerHTML + "^";
      break;
    case "exponent":
      calScreen.innerHTML = String(Math.exp(parseInt(calScreen.innerHTML)));
      break;
    case "base10":
      calScreen.innerHTML = String(Math.pow(10, parseInt(calScreen.innerHTML)));
      break;
    case "logarithm":
      if (calScreen.innerHTML === "") {
        alert("Enter the number for log");
      } else {
        calScreen.innerHTML = String(Math.log(parseInt(calScreen.innerHTML)));
      }
      break;
    case "natural-logarithm":
      if (calScreen.innerHTML == "") {
        alert("Enter the number for ln");
      } else {
        calScreen.innerHTML = String(Math.log10(parseInt(calScreen.innerHTML)));
      }
      break;
    case "factorial":
      calScreen.innerHTML = String(
        factorialFunc(parseInt(calScreen.innerHTML))
      );
      break;
    case "memory-recall":
      calScreen.innerHTML = memoryRecall();
      break;
    case "memory-clear":
      memoryClear();
      break;
    case "memory-plus":
      memoryPlus(calScreen.innerHTML);
      break;
    case "memory-minus":
      memoryMinus();
      break;
    case "pow3":
      if (calScreen.innerHTML.includes("-")) {
        calScreen.innerHTML = String(
          -1 * Math.pow(-1 * parseInt(calScreen.innerHTML), 3)
        );
      } else {
        calScreen.innerHTML = Math.pow(
          parseInt(calScreen.innerHTML),
          3
        ).toString();
      }
      break;
    case "cube-root":
      if (calScreen.innerHTML.includes("-")) {
        calScreen.innerHTML = String(
          -1 * Math.pow(-1 * parseInt(calScreen.innerHTML), 1 / 3)
        );
      } else {
        calScreen.innerHTML = String(
          Math.pow(parseInt(calScreen.innerHTML), 1 / 3)
        );
      }
      break;
    case "x-root-y":
      calScreen.innerHTML += "^";
      break;
    case "base-e":
      calScreen.innerHTML = String(
        Math.pow(Math.E, parseInt(calScreen.innerHTML))
      );
      break;
    case "base2":
      calScreen.innerHTML = String(Math.pow(2, parseInt(calScreen.innerHTML)));
      break;
    case "log2":
      calScreen.innerHTML = String(Math.log2(parseInt(calScreen.innerHTML)));
      break;
  }
}
// Memory Function
function memoryPlus(num: string): number {
  if (memory.length === 0) {
    memory.push(num);
    calScreen.innerHTML = "";
  } else {
    memory.push(num);
    let memory1 = memory.reduce((acc, index) => +acc + +index, 0);
    memory.pop();
    memory.push(memory1.toString());
    calScreen.innerHTML = "";
    return memory1;
  }
}
function memoryMinus() {
  if (memory.length === 0) {
    alert("Nothing is in the memeory");
  } else {
    memory.pop();
  }
  return memory;
}
function memoryStored() {
  if (memory.length === 0) {
    alert("nothing is stored");
  } else {
    calScreen.innerHTML = memory[i].toString();
    i++;
    if (i === memory.length) {
      i = 0;
    }
  }
  return memory;
}
function memoryClear() {
  for (let i = 0; i <= memory.length; i++) {
    memory.pop();
  }
  return memory;
}
function memoryRecall() {
  return memory.pop().toString();
}
function mod(num: string): number {
  let a, b, result;
  a = parseInt(num.slice(0, num.indexOf("%")));
  b = parseInt(num.slice(num.indexOf("%") + 1));
  result = a % b;
  return result;
}
function backSpace(value: string): string {
  return value.substring(0, value.length - 1);
}
//deg and rad function
deg.addEventListener("click", () => {
  if (!deg.classList.contains("show")) {
    deg.classList.add("show");
    deg.innerHTML = "RAD";
    flag = false;
  } else {
    deg.classList.remove("show");
    deg.innerHTML = "DEG";
    flag = true;
  }
});
//Function of factorial
//factorial function
function factorialFunc(n: number): number {
  let result;
  for (let i = 1; i <= n; i++) {
    if (n === 1 || n === 0) {
      result = 1;
    } else {
      result = +n * factorialFunc(+n - 1);
    }
  }
  return result;
}
//adding to the screen
number.forEach((number) => {
  number.addEventListener("click", function () {
    calScreen.innerHTML += number.innerHTML;
  });
});
//operator adding to the screen
operator.forEach((operator) => {
  operator.addEventListener("click", function () {
    calScreen.innerHTML += operator.innerHTML;
  });
});
//function of root
function nthroot(num: string): number {
  let a;
  let b;
  let operand1 = num.slice(0, num.indexOf("^"));
  a = parseInt(operand1);
  let operand2 = num.slice(num.indexOf("^") + 1);
  b = parseInt(operand2);
  return Math.pow(a, b);
}
// events for all the buttons
btns.forEach((btn) => {
  btn.addEventListener("click", eventList);
});
//power function
function pow(num: string): number {
  let a, b;
  a = parseInt(num.slice(0, num.indexOf("^")));
  b = parseInt(num.slice(num.indexOf("^") + 1));
  return Math.pow(a, b);
}
//dropdown menu
function toggle(e: Event): void {
  let target: HTMLElement = <HTMLElement>e.target;
  if (!target.nextElementSibling.classList.contains("show")) {
    target.nextElementSibling.classList.add("show");
  } else {
    target.nextElementSibling.classList.remove("show");
  }
}
trigoButton.addEventListener("click", toggle);
functionButton.addEventListener("click", toggle);
//positive-negative
function changeSign(number: string | number): number {
  number = -1 * +number;
  return number;
}
type stringOrNumber = string | number;
function convertToString(val: stringOrNumber): string {
  return val.toString();
}
//equal function
function evaluate(str: string): stringOrNumber[] {
  function splitString(str: string): stringOrNumber[] {
    let index = 0;
    let splitArray = str
      .split("")
      .reduce((arr: string[], operand: string, i: number) => {
        if (isNaN(parseInt(operand))) {
          arr.push(str.slice(index, i));
          arr.push(operand);
          index = i + 1;
        }
        return arr;
      }, []);
    splitArray.push(str.slice(index));
    return splitArray;
  }
  function findAdditionIndex(arr: stringOrNumber[]) {
    return arr.findIndex((i: stringOrNumber) => i == "+");
  }
  function findSubtractIndex(arr: stringOrNumber[]) {
    return arr.findIndex((i: stringOrNumber) => i == "-");
  }
  function findMultiplyIndex(arr: stringOrNumber[]) {
    return arr.findIndex((i: stringOrNumber) => i == "*");
  }
  function findDivideIndex(arr: stringOrNumber[]) {
    return arr.findIndex((i: stringOrNumber) => i == "/");
  }
  function add(arr: stringOrNumber[]) {
    let index: stringOrNumber = findAdditionIndex(arr);
    arr[index] =
      parseInt(convertToString(arr[+index - 1])) +
      parseInt(convertToString(arr[+index + 1]));

    return arr.filter((c: stringOrNumber, i: stringOrNumber) => {
      return i !== +index - 1 && i !== +index + 1;
    });
  }
  function subtract(arr: stringOrNumber[]) {
    let index: stringOrNumber = findSubtractIndex(arr);
    arr[index] =
      parseInt(convertToString(arr[index - 1])) -
      parseInt(convertToString(arr[index + 1]));
    return arr.filter((c: stringOrNumber, i: stringOrNumber) => {
      return i !== +index - 1 && i !== +index + 1;
    });
  }
  function multiply(arr: stringOrNumber[]) {
    let index: stringOrNumber = findMultiplyIndex(arr);
    arr[index] =
      parseInt(convertToString(arr[index - 1])) *
      parseInt(convertToString(arr[index + 1]));
    return arr.filter((c: stringOrNumber, i: stringOrNumber) => {
      return i !== +index - 1 && i !== +index + 1;
    });
  }
  function divide(arr: stringOrNumber[]) {
    let index: stringOrNumber = findDivideIndex(arr);
    arr[index] =
      parseInt(convertToString(arr[index - 1])) /
      parseInt(convertToString(arr[index + 1]));
    return arr.filter((c: stringOrNumber, i: stringOrNumber) => {
      return i !== +index - 1 && i !== +index + 1;
    });
  }
  function containsAdditionOrSubtract(arr: stringOrNumber[]): boolean {
    return arr.some((i) => i === "+" || i === "-");
  }
  function containsMultiplyOrDivide(arr: stringOrNumber[]): boolean {
    return arr.some((i) => i === "*" || i === "/");
  }
  function simplify(arr: stringOrNumber[]): stringOrNumber[] {
    while (containsMultiplyOrDivide(arr)) {
      if (arr.includes("*")) {
        if (arr.includes("/")) {
          if (findDivideIndex(arr) < findMultiplyIndex(arr)) {
            arr = divide(arr);
          } else {
            arr = multiply(arr);
          }
        } else {
          arr = multiply(arr);
        }
      } else {
        arr = divide(arr);
      }
    }
    while (containsAdditionOrSubtract(arr)) {
      if (arr.includes("+")) {
        if (arr.includes("-")) {
          if (findSubtractIndex(arr) < findAdditionIndex(arr)) {
            arr = subtract(arr);
          } else {
            arr = add(arr);
          }
        } else {
          arr = add(arr);
        }
      } else {
        arr = subtract(arr);
      }
    }
    return arr;
  }
  var arithArray = splitString(str);
  return simplify(arithArray);
}
//Events of keyboard
document.onkeydown = (e) => {
  let char = e.code;
  switch (char) {
    case "Digit0":
    case "Number0":
    case "Numpad0":
      if (!e.shiftKey) {
        calScreen.innerHTML = calScreen.innerHTML + 0;
      } else {
        calScreen.innerHTML = ")";
      }
      break;
    case "Digit1":
    case "Number1":
    case "Numpad1":
      calScreen.innerHTML = calScreen.innerHTML + 1;
      break;
    case "Digit2":
    case "Number2":
    case "Numpad2":
      calScreen.innerHTML = calScreen.innerHTML + 2;
      break;
    case "Digit3":
    case "Number3":
    case "Numpad3":
      calScreen.innerHTML = calScreen.innerHTML + 3;
      break;
    case "Digit4":
    case "Number4":
    case "Numpad4":
      calScreen.innerHTML = calScreen.innerHTML + 4;
      break;
    case "Digit5":
    case "Number5":
    case "Numpad5":
      if (!e.shiftKey) {
        calScreen.innerHTML = calScreen.innerHTML + 5;
      } else {
        calScreen.innerHTML = "%";
      }
      break;
    case "Digit6":
    case "Number6":
    case "Numpad6":
      if (!e.shiftKey) {
        calScreen.innerHTML = calScreen.innerHTML + 6;
      } else {
        calScreen.innerHTML = "^";
      }
      break;
    case "Digit7":
    case "Number7":
    case "Numpad7":
      calScreen.innerHTML = calScreen.innerHTML + 7;
      break;
    case "Minus":
    case "NumpadSubtract":
      calScreen.innerHTML = calScreen.innerHTML + "-";
      break;
    case "NumpadAdd":
    case "NumpadAddition":
      calScreen.innerHTML = calScreen.innerHTML + "+";
      break;
    case "NumpadMultiply":
      calScreen.innerHTML = calScreen.innerHTML + "*";
      break;
    case "NumpadDivide":
    case "slash":
      calScreen.innerHTML = calScreen.innerHTML + "/";
      break;
    case "Digit9":
    case "Number9":
    case "Numpad9":
      if (!e.shiftKey) {
        calScreen.innerHTML = calScreen.innerHTML + 9;
      } else {
        calScreen.innerHTML = "(";
      }
      break;
    case "Enter":
    case "Equal":
    case "NumpadEnter":
      calScreen.innerHTML = eval(calScreen.innerHTML);
      break;
  }
};
