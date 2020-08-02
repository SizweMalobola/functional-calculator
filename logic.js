//variables output
var currentOutput = document.querySelector("#current");
var upperOutput = document.querySelector("#upper");
//variables input
var numbers = document.querySelectorAll(".num");

var operators = document.querySelectorAll(".operator");
//
function evaluate(val1, val2) {
  if (val1[val1.length - 1] == "÷") {
    val1 = val1.slice(0, upperOutput.innerText.length - 2);
    return (val1 / val2).toFixed(2);
  } else if (val1[val1.length - 1] == "x") {
    val1 = val1.slice(0, upperOutput.innerText.length - 2);
    return val1 * val2;
  }
}
/*
if user clickes on any of the operators while there are no numbers on screen,
nothing is returned
when a user clicks on a number and then clickes on a operator,
the number and the operator clicked will be moved to upper.Leaving current empty.
>if the user clickes another number and operator,
the previous operator will be used to eval the new number and previous number that was on upper and the new operator will stored at the end of the newly evaluated number.
>if only a operator is clicked at that point the operator at upper will be replaced by the newone that has just been pressed.
*/
var newNum = Array.from(numbers);
newNum.forEach(function (item) {
  item.addEventListener("click", function (e) {
    currentOutput.innerText += e.target.innerText;
  });
});

var specialOperators = Array.from(
  document.querySelectorAll(".primary-inverse")
);
specialOperators.forEach(function (item) {
  item.addEventListener("click", function (e) {
    if (e.target.classList.contains("clear")) {
      currentOutput.innerText = "";
      upperOutput.innerText = "";
    }
    if (e.target.classList.contains("sign")) {
      let negativeReg = /[-]/g;
      if (currentOutput.innerText == "") {
        return;
      }
      if (negativeReg.test(currentOutput.innerText)) {
        currentOutput.innerText = currentOutput.innerText.slice(1);
      } else {
        currentOutput.innerText = `-${currentOutput.innerText}`;
      }
    }
    if (e.target.classList.contains("percent")) {
      if (currentOutput.innerText == "") {
        return;
      } else {
        currentOutput.innerText = currentOutput.innerText / 100;
      }
    }
  });
});

var newOperators = Array.from(document.querySelectorAll(".secondary"));
var divideReg = /[÷]/g;
var multiplyReg = /[x]/g;
newOperators.forEach(function (item) {
  item.addEventListener("click", function (e) {
    if (currentOutput.innerText == "" && upperOutput.innerText == "") {
      return;
    } else {
      if (e.target.classList.contains("divide")) {
        if (upperOutput.innerText == "") {
          upperOutput.innerText = `${currentOutput.innerText} ÷`;
          currentOutput.innerText = "";
        } else if (
          divideReg.test(upperOutput.innerText) &&
          currentOutput.innerText != ""
        ) {
          upperOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = `${(
            upperOutput.innerText / currentOutput.innerText
          ).toFixed(2)} ÷`;
          currentOutput.innerText = "";
        } else if (upperOutput.innerText != "") {
          upperOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = `${upperOutput.innerText} ÷`;
        }
      }
      if (e.target.classList.contains("multiply")) {
        if (upperOutput.innerText == "") {
          upperOutput.innerText = `${currentOutput.innerText} x`;
          currentOutput.innerText = "";
        } else if (
          multiplyReg.test(upperOutput.innerText) &&
          currentOutput.innerText != ""
        ) {
          upperOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = `${
            upperOutput.innerText * currentOutput.innerText
          } x`;
          currentOutput.innerText = "";
        } else if (upperOutput.innerText != "") {
          upperOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = `${upperOutput.innerText} x`;
        }
      }
    }
  });
});
