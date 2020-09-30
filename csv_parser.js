const fs = require("fs");

const readDataFromFile = (path, callback) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) throw err;
    callback(data);
  });
};

const parsData = (data, limit = 10) => {
  // split into lines, 10 lines max
  const linesArray = data.split(/\r?\n/g, limit);
  // split into cells
  const colArray = linesArray.map((line) => {
    return line.split(",");
  });
  // extract the headers from data
  const [headersArray] = colArray.splice(0, 1);
  // let newMap = new Map();
  // create an array of pairs: property, value
  const pairsArray = colArray.map((line) => {
    return line.map((value, index) => {
      const typedVale = setValueType(value);
      return [headersArray[index], typedVale];
    });
  });
  // create an array of objects from the array of pairs
  const objArray = pairsArray.map((pair) => {
    return Object.fromEntries(pair);
  });
  console.log(objArray);
};

const setValueType = (value) => {
  try {
    if (!isNaN(value)) {
      return +value;
    }
    let url = new URL(value);
    return url;
  } catch (_) {
    return value;
  }
};

readDataFromFile("MOCK_DATA.csv", parsData);
