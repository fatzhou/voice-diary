/**
 * 否则判断是否有lastId
 * @param lastId
 */
export const figureHasMore = (lastId: string | number | undefined) => {
  if (Number.isNaN(lastId)) {
    return false;
  }
  return !(Number(lastId) === 0);
};
