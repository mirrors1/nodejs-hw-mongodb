const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    [`work`, `home`, `personal`].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;
  const isBoolean = (isFavourite) => [`true`, `false`].includes(isFavourite);

  if (isBoolean(isFavourite)) return isFavourite;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};
