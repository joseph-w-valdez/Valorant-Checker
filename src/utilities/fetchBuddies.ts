export const fetchBuddies = async ( ) => {
  try {
    const response = await fetch('https://valorant-api.com/v1/buddies');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
