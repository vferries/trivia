var memoizedRandoms = [];

function getConsoleOutputForSourceCode(codeToRun) {
    var consoleOutput = '';
    console.log = function (text) {
        consoleOutput += text + '\n'
    };

    require(codeToRun);
    return consoleOutput;
}

function saveEachRandomCall() {
    var originalRandom = Math.random;
    Math.random = function () {
        var randomValue = originalRandom();
        memoizedRandoms.push(randomValue);
        return randomValue;
    };
}

function replayEachSavedRandomCall() {
    Math.random = function () {
        return memoizedRandoms.shift();
    };
}

saveEachRandomCall();
var goldenMasterConsoleOutput = getConsoleOutputForSourceCode('./game-golden.js');

replayEachSavedRandomCall();
var refactoredConsoleOutput = getConsoleOutputForSourceCode('./game.js');


describe("Golden Master Test", function() {
  it("Should return the same result as Golden Master when using the same randoms in the same order", function() {
    expect(refactoredConsoleOutput).toEqual(goldenMasterConsoleOutput);
  });
});
