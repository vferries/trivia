function getConsoleOutputForSourceCode(codeToRun) {
    var consoleOutput = '';
    console.log = function (text) {
        consoleOutput += text + '\n'
    };

    require(codeToRun);
    return consoleOutput;
}


var memoizedRandoms = [];
var originalRandom = Math.random;
Math.random = function() {
  var randomValue = originalRandom();
  memoizedRandoms.push(randomValue);
  return randomValue;
};
var goldenMasterConsoleOutput = getConsoleOutputForSourceCode('./game-golden.js');

Math.random = function() {
    return memoizedRandoms.shift();
};
var refactoredConsoleOutput = getConsoleOutputForSourceCode('./game.js');


describe("Golden Master Test", function() {
  it("Should return the same result as Golden Master when using the same randoms in the same order", function() {
    expect(refactoredConsoleOutput).toEqual(goldenMasterConsoleOutput);
  });
});
