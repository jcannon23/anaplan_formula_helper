console.log('waiting for formula editor elements to arrive');

$(document).arrive(".formulaBarText", function() {
  console.log('bar arrived');
  var formulaElement = document.querySelector('.formulaBarText');
  tooltip.formulaElement = formulaElement;
  tooltip.tooltipPositioning();
  setEventListener(formulaElement);
});

$(document).arrive(".formulaEditorText", function(e) {
  console.log('editor arrived');
  var formulaElement = document.querySelector('.formulaEditorText');
  tooltip.formulaElement = formulaElement;
  tooltip.tooltipPositioning();
  setEventListener(formulaElement);
});

var setEventListener = function (formulaElement) {
  formulaElement.addEventListener('keyup', function(e) {
    setTimeout(function() {
        var fullFormula = e.srcElement.value.toLowerCase();
        var caretPosition = doGetCaretPosition(formulaElement);
        var formulaUpToCursor = fullFormula.slice(0,caretPosition);

        openFunc(formulaUpToCursor);
    }, 0);
  });
};

var openFunc = function (formula) {
  var closeParenCount = 0;
  for (var i = formula.length - 1; i > -1; i--) {
    if (formula[i] == '(') {
      if (closeParenCount === 0) {
        var startIdxOfLastFunc = formula.slice(0,i).search(/(\w+)$/);
        var funcText = formula.slice(startIdxOfLastFunc,i);
        var commas = countCommas(formula.slice(startIdxOfLastFunc, formula.length));
        tooltip.openFunc(FUNCTIONS[funcText],commas);
        return;
      } else {
        closeParenCount -= 1;
      }
    } else if (formula[i] == ')') {
      closeParenCount += 1;
    }
  }
  tooltip.clear();
};

var countCommas = function(text) {
  return text.split(',').length - 1;
};
