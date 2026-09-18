// 簡易計算機與字串處理小工具
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}
function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

function greet(name) {
    return `Hello, ${name}! Welcome to Git demo.`;
}

console.log(greet("Developer"));
console.log(`3 + 5 = ${add(3, 5)}`);
console.log(`10 - 4 = ${subtract(10, 4)}`);
console.log(`4 * 6 = ${multiply(4, 6)}`);
console.log(`20 / 4 = ${divide(20, 4)}`);

module.exports = { add, multiply, subtract, divide, greet };
