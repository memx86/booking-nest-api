const excludeFields = <T>(
  object: T,
  fields: { [Property in keyof T]+?: boolean },
) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    if (!fields[key]) return;
    delete result[key];
  });
  return result;
};

export default excludeFields;
