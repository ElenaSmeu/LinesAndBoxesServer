const grid_size = 3;

function generateBoxCoordinates() {
    const boxCoords = [];
    for (let i = 1; i < grid_size * 2; i += 2) {
        for (let j = 1; j < grid_size; j++) {
            if (i < grid_size * 2 - 1 && j < grid_size * 4 - 3) {
                boxCoords.push([`${i}${j}`, `${i + 1}${j + 1}`, `${i + 2}${j}`, `${i + 1}${j}`]);
            }
        }
    }
    return boxCoords;
}

function defaultState() {
    const boxCoordinates = generateBoxCoordinates();
    const flatBoxCoordinates = new Set(boxCoordinates.flat());

    for (let i = 0; i < boxCoordinates.length; i++) {
        flatBoxCoordinates.add(`${i + 1}`);
    }

    const flatBoxCoordinatesArray = [...flatBoxCoordinates];
    const myDict = {};
    for (let i = 0; i < flatBoxCoordinatesArray.length; i++) {
        myDict[flatBoxCoordinatesArray[i]] = 0;
    }

    return myDict;
}

function checkBoxes(val, current) {
    const coordinates = generateBoxCoordinates();
    for (let index = 0; index < coordinates.length; index++) {
        const box = coordinates[index];
        const filteredItems = Object.entries(current).filter(([key, value]) => box.includes(key) && value === 0);
        const takenLines = filteredItems.length;
        if (takenLines === 4 && box.includes(val)) {
            const res = box.every(ele => coordinates[index].includes(ele));
            if (res) {
                return index + 1; // Return the key of the box
            }
        }
    }
}
function checkForCompletedBoxes(currentBoard) {
    const boxes = [{boxKey: "1", lookFor: ["11", "22", "31", "21"]}
            ,{boxKey: "2",lookFor: ["12", "23", "32", "22"]}
            ,{boxKey: "3",lookFor: ["31", "42", "51", "41"]}
            ,{boxKey: "4",lookFor:  ["32", "43", "52", "42"]}
        ]
    const leftToCheck = boxes.filter(b => currentBoard[b.boxKey] == 0);
    console.log("leftTocheck", leftToCheck);
    const result = leftToCheck.map(box => 
        {const linesChecks = box.lookFor.filter(line => currentBoard[line] === 0).length
            console.log(linesChecks);
            if (linesChecks == 4) {
              return box.boxKey
            }
            else return null
        }
    ).filter((v) => v !== null || v!== undefined);
    console.log("res", result);
    return result;
}

function movePlayer(row, column, latestboard, oldPlayerScore, player) {
    player1Input = row +""+column;
    Object.keys(latestboard).forEach((key) => {
        lastKey = key;
        if (key.length == 2) {
            if (latestboard[key] == 1 && key == player1Input) {
                latestboard[key] = 0;
            }
        }
    });
    const boxedMarket = checkForCompletedBoxes(latestboard);
    const playerBoxValue = player == 1 ? 1 : 2;
    console.log(boxedMarket);
    boxedMarket.forEach(boxKey => {
        latestboard[boxKey] = playerBoxValue;
        oldPlayerScore = oldPlayerScore + 1 
    })

    return {newBoard: latestboard, newPlayerScore: oldPlayerScore}
}

module.exports = {
    defaultState, checkBoxes, movePlayer
}
