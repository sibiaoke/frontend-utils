/**
 * Accurately process floating point number to its correct representation.
 *
 * This function avoids the floating point precision issue in JavaScript by
 * converting the number to a string and then back to a number. It ensures
 * common calculations such as 0.1 + 0.2 result in 0.3.
 *
 * Note: This function may still have precision issues with extremely large
 * or small numbers due to inherent limitations of JavaScript's number type.
 * For high precision requirements, consider using libraries like bignumber.js
 * or decimal.js.
 * 用于解决 JavaScript 中的浮点数精度问题
 *
 * 该方法通过将数字转换为字符串再转换回数字，避免了 JavaScript 中的浮点数精度问题，
 * 确保常见的计算如 0.1 + 0.2 的结果为 0.3。
 *
 * 注意：由于 JavaScript 数字类型的固有限制，对于极大或极小的数字，该方法可能仍存在精度问题。
 * 若需要高精度计算，建议使用 bignumber.js 或 decimal.js 等库。
 *
 * @param {number} num - The number to process.
 * @param {number} [precision=15] - The precision level to use, default is 15.
 * @returns {number} The accurate representation of the number.
 */
export function accurateNum(num: number, precision: number = 15): number {
  return parseFloat(num.toPrecision(precision));
}
