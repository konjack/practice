import "./k-router.js";
import "./app.js";

const test = await fetch("php/test.php");
const testData = await test.json();
console.log(testData);