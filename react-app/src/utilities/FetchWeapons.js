import { useEffect } from 'react';

const FetchWeapons = ({ selectedOption, setWeapons }) => {
  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/weapons');
        const data = await response.json();
        let filteredWeapons = data.data;
        if (selectedOption !== 'No Filter') {
          filteredWeapons = filteredWeapons.filter(weapon => weapon.category === selectedOption);
        }
        setWeapons(filteredWeapons);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeapons();
  }, [selectedOption, setWeapons]);

  return null; // Render nothing or a loading spinner if desired
};

export default FetchWeapons;

export const fetchWeapon = async (weaponName) => {
  try {
    const response = await fetch('https://valorant-api.com/v1/weapons');
    const data = await response.json();
    const weapon = data.data.find(weapon => weapon.displayName.toLowerCase() === weaponName.toLowerCase());
    return weapon || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
