const currencyLocalesMap: Record<string, string> = {
  CNY: 'zh-CN', // 人民币 - 中国
  USD: 'en-US', // 美元 - 美国
  EUR: 'de-DE', // 欧元 - 德国
  JPY: 'ja-JP', // 日元 - 日本
  GBP: 'en-GB', // 英镑 - 英国
  // 可以根据需要添加更多货币及其对应的 locales
};
/**
 * 格式化数字为指定货币类型的字符串
 * @param amount - 需要格式化的数字
 * @param currency - 货币类型（可选），默认为 'CNY'
 * @returns {string} 格式化后的货币字符串
 */
export function format(amount: number, currency: string = 'CNY'): string {
  // 根据货币类型选择合适的 locales，默认为 'zh-CN'
  const locales = currencyLocalesMap[currency] || 'zh-CN';
  // 创建 Intl.NumberFormat 对象，用于格式化货币
  const formatter = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
  });

  // 格式化并返回结果
  return formatter.format(amount);
}
