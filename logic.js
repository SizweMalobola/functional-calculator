//variables output
var currentOutput = document.querySelector("#current");
var upperOutput = document.querySelector("#upper");
//variables input
var numbers = document.querySelectorAll(".num");
//eval function
function evaluate(val1, val2) {
  if (val1[val1.length - 1] == "÷") {
    val1 = val1.slice(0, upperOutput.innerText.length - 2);
    return (val1 / val2).toFixed(2);
  } else if (val1[val1.length - 1] == "x") {
    val1 = val1.slice(0, upperOutput.innerText.length - 2);
    return val1 * val2;
  } else if (val1[val1.length - 1] == "-") {
    val1 = val1.slice(0, upperOutput.innerText.length - 2);
    return +val1 - +val2;
  } else if (val1[val1.length - 1] == "+") {
    val1 = val1.slice(0, upperOutput.innerText.length - 2);
    return +val1 + +val2;
  }
}
//
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
newOperators.forEach(function (item) {
  item.addEventListener("click", function (e) {
    if (currentOutput.innerText == "" && upperOutput.innerText == "") {
      return;
    } else {
      if (e.target.classList.contains("divide")) {
        if (upperOutput.innerText == "" && currentOutput.innerText != "") {
          upperOutput.innerText = `${currentOutput.innerText} ÷`;
          currentOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText != ""
        ) {
          upperOutput.innerText = `${evaluate(
            upperOutput.innerText,
            currentOutput.innerText
          )} ÷`;
          currentOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText == ""
        ) {
          upperOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = `${upperOutput.innerText} ÷`;
        }
      }
      if (e.target.classList.contains("multiply")) {
        if (upperOutput.innerText == "" && currentOutput.innerText != "") {
          upperOutput.innerText = `${currentOutput.innerText} x`;
          currentOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText != ""
        ) {
          upperOutput.innerText = `${evaluate(
            upperOutput.innerText,
            currentOutput.innerText
          )} x`;
          currentOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText == ""
        ) {
          upperOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = `${upperOutput.innerText} x`;
        }
      }
      if (e.target.classList.contains("minus")) {
        if (upperOutput.innerText == "" && currentOutput.innerText != "") {
          upperOutput.innerText = `${currentOutput.innerText} -`;
          currentOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText != ""
        ) {
          upperOutput.innerText = `${evaluate(
            upperOutput.innerText,
            currentOutput.innerText
          )} -`;
          currentOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText == ""
        ) {
          upperOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = `${upperOutput.innerText} -`;
        }
      }
      if (e.target.classList.contains("add")) {
        if (upperOutput.innerText == "" && currentOutput.innerText != "") {
          upperOutput.innerText = `${currentOutput.innerText} +`;
          currentOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText != ""
        ) {
          upperOutput.innerText = `${evaluate(
            upperOutput.innerText,
            currentOutput.innerText
          )} +`;
          currentOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText == ""
        ) {
          upperOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = `${upperOutput.innerText} +`;
        }
      }
      if (e.target.classList.contains("equals")) {
        if (upperOutput.innerText != "" && currentOutput.innerText == "") {
          currentOutput.innerText = upperOutput.innerText.slice(
            0,
            upperOutput.innerText.length - 2
          );
          upperOutput.innerText = "";
        } else if (
          upperOutput.innerText != "" &&
          currentOutput.innerText != ""
        ) {
          currentOutput.innerText = evaluate(
            upperOutput.innerText,
            currentOutput.innerText
          );
          upperOutput.innerText = "";
        }
      }
    }
  });
});
