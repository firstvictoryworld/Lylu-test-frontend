export const trimQuery = (query: any) => {
  const result: any = {};
  Object.keys(query).forEach((key: string) => {
    const value: any = query[key];
    if (
      value !== undefined &&
      value !== '' &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      result[key] = value;
    }
  });
  return result;
}