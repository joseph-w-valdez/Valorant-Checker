export const fetchWeapons = async (selectedOption, setWeapons) => {
  try {
    const response = await fetch('https://valorant-api.com/v1/weapons');
    const data = await response.json();
    if (selectedOption !== 'No Filter') {
      /* convert the selectedOption string to the format used in the API */
      const selectedOptionQuery = `EEquippableCategory::${selectedOption}`
      const filteredWeapons = data.data.filter(weapon => weapon.category === selectedOptionQuery);
      setWeapons(filteredWeapons);
    } else {
      setWeapons(data.data)
    }
  } catch (error) {
    console.error(error);
  }
};
