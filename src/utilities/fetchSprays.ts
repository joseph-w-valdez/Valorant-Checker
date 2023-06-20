export const fetchSprays = async ( ) => {
  try {
    const response = await fetch('https://valorant-api.com/v1/sprays');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
