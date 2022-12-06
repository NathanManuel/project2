numbers();
operators();
equal();
var input = document.getElementById("input");
var total = 0;
var nr = 0;
var ope = null;
var eq = false;
function equal() {
  const equal = document.getElementById("result");
  equal.onclick = () => {
    // for each operator there is a different operation, first number (total) becomes the total of both first and second number
    if (nr == 0) {
      nr = total;
    }
    switch (ope) {
      case "+":
        total += nr;
        break;
      case "-":
        total -= nr;
        break;
      case "×":
        total *= nr;
        break;
      case "÷":
        total /= nr;
        break;
      default:
        total = total;
    }
    // resets operator and second number
    ope = null;
    eq = true;
    nr = 0;
    total = Math.round(total * 100) / 100;
    input.textContent = total;
  };
}
function operators() {
  const operators = document.querySelectorAll(".operators > *");
  operators.forEach((operator) => {
    operator.onclick = () => {
      // saves the clicked operator and displayes it on the input text
      ope = operator.textContent;
      input.textContent += ope;
    };
  });
}
function numbers() {
  const el = document.querySelectorAll("div.numbers > *");
  el.forEach((number) => {
    number.onclick = () => {
      const operators = document.querySelectorAll(".operators > *");
      operators.forEach((operator) => {
        // if there is a operator the input text content will be cleard
        if (input.textContent.includes(operator.textContent)) {
          input.textContent = "";
        }
      });
      if (eq) {
        // if equal was just used and there was no operatorator used then the calculation will reset and start from the first number input
        input.textContent = "";
        eq = false;
      }
      if (number.textContent == "." && !input.textContent.includes(".")) {
        if (input.textContent == "") {
          input.textContent = "0";
        }
        input.textContent += number.textContent;
        nr = Number(input.textContent);
      }
      // stop C and . from interfeering
      if (number.textContent != "C" && number.textContent != ".") {
        // if there is no operator then it will be taken as the first number (total)
        if (ope == null) {
          input.textContent += number.textContent;
          total = Number(input.textContent);
        } else {
          // if there is a operator then it will be taken as the second number (nr)
          input.textContent += number.textContent;
          nr = Number(input.textContent);
        }
      }

      // reset everything
      if (number.textContent == "C") {
        total = 0;
        input.textContent = "";
        nr = 0;
        ope = null;
        eq = false;
      }
    };
  });
}
