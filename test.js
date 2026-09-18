const { add, subtract, multiply, divide } = require("./app");

console.log("-----------------------------------------");
console.log("🚀 [CI 機器人] 開始執行自動化測試流水線...");
console.log("-----------------------------------------");

// 1. 測試加法
if (add(2, 3) !== 5) {
    console.error("❌ 測試失敗：加法結果錯誤！");
    process.exit(1);
}
console.log("  ✔ 加法測試通過 (2 + 3 = 5)");

// 2. 測試減法
if (subtract(10, 4) !== 6) {
    console.error("❌ 測試失敗：減法結果錯誤！");
    process.exit(1);
}
console.log("  ✔ 減法測試通過 (10 - 4 = 6)");

// 3. 測試乘法
if (multiply(3, 7) !== 21) {
    console.error("❌ 測試失敗：乘法結果錯誤！");
    process.exit(1);
}
console.log("  ✔ 乘法測試通過 (3 * 7 = 21)");

// 4. 測試除法
if (divide(20, 4) !== 5) {
    console.error("❌ 測試失敗：除法結果錯誤！");
    process.exit(1);
}
console.log("  ✔ 除法測試通過 (20 / 4 = 5)");

console.log("-----------------------------------------");
console.log("🎉 全部測試通過！CI 檢驗成功，准許合併或發布！");
console.log("-----------------------------------------");
