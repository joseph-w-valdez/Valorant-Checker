import { onlyLettersAndNumbers } from "./stringConversions";

export const fetchSprays = async ( ) => {
  try {
    const response = await fetch('https://valorant-api.com/v1/sprays');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchSpray = async (sprayName: string | undefined) => {
  try {
    if (!sprayName) {
      throw new Error('Spray name is undefined');
    }
    const response = await fetch('https://valorant-api.com/v1/sprays');
    const data = await response.json();
    const spray = data.data.find(
      (spray: any) => onlyLettersAndNumbers(spray.displayName.toLowerCase()) === sprayName.toLowerCase()
    );
    return spray || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
