/**
 * 生成随机id
 */
export const genId = () => {
  return Math.random().toString(32).slice(2);
};
