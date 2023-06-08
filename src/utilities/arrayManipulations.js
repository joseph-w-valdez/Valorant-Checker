export const alphabetizeArray = (array) => {
  return array.sort((a, b) => {
    const displayNameA = a.displayName.toUpperCase();
    const displayNameB = b.displayName.toUpperCase();

    if (displayNameA < displayNameB) {
      return -1;
    }
    if (displayNameA > displayNameB) {
      return 1;
    }
    return 0;
  });
};
