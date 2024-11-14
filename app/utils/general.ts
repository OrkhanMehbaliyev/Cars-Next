export const getYearRange = (from: number, to = new Date().getFullYear()) =>
  Array.from({ length: to - from }, (_, i) => to - i);

export const getApiResponse = async <T = any>(
  url: string,
  dataExtractor?: string
): Promise<{ data: T | null; error: string | null }> => {
  const responseJSON = await fetch(url);

  if (!responseJSON.ok) {
    return { data: null, error: "Failed to fetch the data" };
  }

  const response = await responseJSON.json();

  return {
    data: dataExtractor ? response?.[dataExtractor] : response,
    error: null,
  };
};

export function getUniqueObjectsById(array: Array<any>, fieldName: string) {
  const uniqueIds = new Set();
  return array.filter((obj) => {
    if (!uniqueIds.has(obj?.[fieldName])) {
      uniqueIds.add(obj?.[fieldName]);
      return true;
    }
    return false;
  });
}
