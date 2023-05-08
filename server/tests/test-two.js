var shell = require("shelljs");

const abc = async () => {
    await shell.exec(`npm run test-one`);
    console.log("abc")
}
abc();