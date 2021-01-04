const createString = () => {
  return Math.random().toString(36).substr(2, 10);
};

const printOutStringWithTimestamp = (randomString) => {
  console.log(`${new Date().toISOString()}: ${randomString}`);

  setTimeout(printOutStringWithTimestamp, 5000, randomString);
};

const randomString = createString();
printOutStringWithTimestamp(randomString);
