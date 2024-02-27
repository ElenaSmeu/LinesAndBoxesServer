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

function checkBoxes(val, current, player) {
    const coordinates = generateBoxCoordinates();
    for (let index = 0; index < coordinates.length; index++) {
        const box = coordinates[index];
        const filteredItems = Object.entries(current).filter(([key, value]) => box.includes(key) && value === 1);
        const takenLines = filteredItems.length;
        if (takenLines === 4 && box.includes(val)) {
            console.log(`Last line in box ${index + 1} taken by player ${player}`);

            const res = box.every(ele => coordinates[index].includes(ele));
            if (res) {
                return index + 1; // Return the key of the box
            }
        }
    }
}

module.exports = {
    defaultState, checkBoxes
}
