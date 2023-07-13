export const alphabetizeArray = (array: { displayName: string }[]) => {
  return array.sort((a: { displayName: string }, b: { displayName: string }) => {
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
