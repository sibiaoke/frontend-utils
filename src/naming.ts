/**
 * 将驼峰命名法转换为横线命名法
 * @param str - 需要转换的驼峰命名字符串
 * @returns {string} 转换后的横线命名字符串
 */
export function camelToKebab(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
/**
 * 将横线命名法转换为驼峰命名法
 * @param str - 需要转换的横线命名字符串
 * @returns {string} 转换后的驼峰命名字符串
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
