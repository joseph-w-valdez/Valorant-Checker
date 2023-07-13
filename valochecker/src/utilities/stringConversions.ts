export const convertCamelCase = (str: string): string => {
  if (str === 'ADS') {
    return 'ADS';
  }
  if (str === 'VFX') {
    return 'VFX';
  }
  if (str === 'ROFIncrease') {
    return 'ROF Increase';
  }
  if (typeof str === 'string') {
    let convertedStr = str.replace(/([A-Z])/g, ' $1');
    convertedStr = convertedStr.trim().split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Replace specific strings in the converted string
    convertedStr = convertedStr.replace(/Meters/g, '(meters)');
    convertedStr = convertedStr.replace(/Seconds/g, '(seconds)');

    return convertedStr;
  }
  return str;
};

export const convertContainsColons = (str: string): string => {
  // Check if the input is a string and contains '::'
  if (typeof str === 'string' && str.includes('::')) {
    // Extract the string value after ':::'
    const convertedStr = str.split('::')[1].trim();
    // Split the converted string by '::' and return the last element
    return convertedStr;
  }

  return str;
};

export const roundLongDecimals = (value: number | string): string => {
  if (!isNaN(Number(value))) {
    const roundedValue = parseFloat(value as string);
    if (roundedValue % 1 !== 0) {
      const decimalString = roundedValue.toString();
      const decimalSeparatorIndex = decimalString.indexOf('.') !== -1 ? decimalString.indexOf('.') : decimalString.indexOf(',');
      if (decimalSeparatorIndex !== -1) {
        const decimalPlaces = decimalString.substring(decimalSeparatorIndex + 1).length;
        if (decimalPlaces > 2) {
          return roundedValue.toFixed(2);
        }
      }
    }
    return roundedValue.toString();
  }
  return value as string;
};

export const shortenLevelText = (inputString: string): string => {
  const levelIndex = inputString.indexOf('Level');
  if (levelIndex !== -1) {
    const textAfterLevel = inputString.slice(levelIndex + 6).trim();
    const hyphenIndex = textAfterLevel.indexOf('-');
    if (hyphenIndex !== -1) {
      const newText = textAfterLevel.slice(hyphenIndex + 1).trim();
      return `Level ${textAfterLevel.slice(0, hyphenIndex).trim()} (${newText})`;
    }
    return `Level ${textAfterLevel}`;
  }
  return '';
};

export const removeParentheses = (str: string): string => {
  if (str.trim() === '') {
    return 'Base Skin'; // Empty string, return "Base Skin"
  }

  if (!str.includes('Level')) {
    return str; // "Level" not found, return the original string
  }

  const startIndex = str.indexOf('(');
  const endIndex = str.indexOf(')');

  if (startIndex !== -1 && endIndex !== -1) {
    // Extract the text between parentheses
    const textInsideParentheses = str.substring(startIndex + 1, endIndex);

    // Remove the word "Level" and trim any extra spaces
    const modifiedString = textInsideParentheses.replace('Level', '').trim();

    if (modifiedString.includes('Variant')) {
      const variantIndex = modifiedString.indexOf('Variant');
      const variantText = modifiedString.substring(variantIndex);
      return variantText; // Return the modified string if it contains "Variant"
    } else {
      const words = modifiedString.split(' ');

      if (words.length > 1) {
        const hyphenatedString = words.slice(1).join(' ');
        return `${words[0]} - ${hyphenatedString}`; // Join the words with a hyphen
      } else {
        return modifiedString; // Return the modified string as is
      }
    }
  }

  return str; // Opening and closing parentheses not found, return the original string
};

export const normalizeAbilitySlot = (str: string): string => {
  if (str === 'Grenade') {
    return 'Signature';
  }

  // Use regular expression to separate the word and number
  const regex = /^([a-zA-Z]+)(\d+)$/;
  const match = str.match(regex);

  if (match) {
    const word = match[1];
    const number = match[2];
    return `${word} ${number}`;
  }

  return str;
};

// Remove non-letter and non-number characters in a string
export const onlyLettersAndNumbers = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9]/g, '');
};


export const normalizeSelectedOption = (input:string) => {
  if (input === 'SMG') {
    return input;
  } else if (input === 'No Filter') {
    return '';
  } else {
    return input.toLowerCase();
  }
};
