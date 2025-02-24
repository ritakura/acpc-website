var permutation = [];
var power = [];
var queries = [];
var outputlist = [];

function parseInput(str) {
    str = str.trim();
    let numberList = str.split(' ').map(Number);
    for (let i = 0; i < numberList.length; i++) {
        if (isNaN(numberList[i])) {
            return [];
        }
    }
    var used = Array(numberList.length).fill(false);
    for (let i = 0; i < numberList.length; i++) {
        if (numberList[i] < 1 || numberList[i] > numberList.length || used[numberList[i] - 1]) {
            return [];
        }
        used[numberList[i] - 1] = true;
    }
    return numberList;
}

function updateOutput() {
    var outlist = document.getElementById('output-list');
    outlist.innerHTML = '';
    for (let i = 0; i < outputlist.length; i++) {
        var output = document.createElement('li');
        var query = document.createElement('span');
        var arrow = document.createElement('span');
        var result = document.createElement('span');
        result.className = "result";
        query.innerHTML = "[" + queries[i].join(" ") + "]";
        arrow.innerHTML = "->";
        result.innerHTML = outputlist[i].join(" ");
        output.appendChild(query);
        output.appendChild(arrow);
        output.appendChild(result);
        outlist.appendChild(output);
    }
}

function resetOutput() {
    queries = [];
    outputlist = [];
    updateOutput();
}

function setExpected() {
    resetOutput();
    var errorMessage = document.getElementById('expected-error');
    errorMessage.innerHTML = '';
    var outputOrdering = document.getElementById('output-ordering');
    outputOrdering.innerHTML = '';

    var textBox = document.getElementById('expected');
    permutation = parseInput(textBox.value);
    if (permutation.length <= 1) {
        errorMessage.innerHTML = 'Not a valid permutation';
        permutation = [];
        return;
    }

    var popcount = 0;
    var len = permutation.length;
    while (len > 0) {
        popcount += len & 1;
        len >>= 1;
    }
    if (popcount != 1) {
        errorMessage.innerHTML = 'Permutation length must be a power of 2';
        permutation = [];
        return;
    }

    /* Valid ordering, update */
    outputOrdering.innerHTML = "[" + permutation.join(" ") + "]";
    power = Array(permutation.length).fill(0);
    for (let i = 0; i < permutation.length; i++) {
        power[permutation[i] - 1] = permutation.length - i;
    }
}

function runQuery() {
    var errorMessage = document.getElementById('query-error');
    errorMessage.innerHTML = '';

    var queryText = document.getElementById('query');
    var queryList = parseInput(queryText.value);
    if (queryList.length <= 1) {
        errorMessage.innerHTML = 'Not a valid permutation';
        return;
    }
    if (queryList.length != permutation.length) {
        errorMessage.innerHTML = 'Query length does not match permutation length';
        return;
    }

    var nextOutput = [];
    for (let i = 0; i < queryList.length; i += 2) {
        if (power[queryList[i] - 1] > power[queryList[i + 1] - 1]) {
            nextOutput.push(queryList[i]);
        } else {
            nextOutput.push(queryList[i + 1]);
        }
    }
    queries.push(queryList);
    outputlist.push(nextOutput);
    updateOutput();
}

function setEnterListener() {
    var expectedText = document.getElementById('expected');
    expectedText.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            setExpected();
        }
    });
    var queryText = document.getElementById('query');
    queryText.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            runQuery();
        }
    });
}
