export const getRandomSkins = (skins: any[], count: number): any[] => {
  const filteredSkins = skins.filter(
    (skin) =>
      !skin.displayName.toLowerCase().includes('standard') &&
      !skin.displayName.toLowerCase().includes('random')
  );
  const shuffledSkins = filteredSkins.sort(() => 0.5 - Math.random());
  return shuffledSkins.slice(0, count);
};
