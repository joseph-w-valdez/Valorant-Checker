import { onlyLettersAndNumbers } from "./stringConversions";

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

export const fetchBuddy = async (buddyName: string | undefined) => {
  try {
    if (!buddyName) {
      throw new Error('Buddy name is undefined');
    }
    const response = await fetch('https://valorant-api.com/v1/buddies');
    const data = await response.json();
    const buddy = data.data.find(
      (buddy: any) => onlyLettersAndNumbers(buddy.displayName.toLowerCase()) === onlyLettersAndNumbers(buddyName.toLowerCase())
    );
    return buddy || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
