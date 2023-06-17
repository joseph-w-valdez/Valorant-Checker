export const fetchWeapons = async (selectedOption: string, setWeapons: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const response = await fetch('https://valorant-api.com/v1/weapons');
    const data = await response.json();
    if (selectedOption !== 'No Filter') {
      /* convert the selectedOption string to the format used in the API */
      const selectedOptionQuery = `EEquippableCategory::${selectedOption}`
      const filteredWeapons = data.data.filter((weapon: any) => weapon.category === selectedOptionQuery);
      setWeapons(filteredWeapons);
      return filteredWeapons; // Explicitly return the filtered weapons
    } else {
      setWeapons(data.data);
      return data.data; // Explicitly return all weapons
    }
  } catch (error) {
    console.error(error);
    return []; // Return an empty array or handle the error case appropriately
  }
};

export const fetchWeapon = async (weaponName: string | undefined) => {
  try {
    if (!weaponName) {
      throw new Error('Weapon name is undefined');
    }
    const response = await fetch(`https://valorant-api.com/v1/weapons?displayName=${weaponName}`);
    const data = await response.json();
    const weapon = data.data.find((weapon: any) => weapon.displayName.toLowerCase() === weaponName.toLowerCase());
    return weapon || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
