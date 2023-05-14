export const convertCamelCase = (str) => {
  // If the str is ADS, return ADS without using conversion code
  if (str === 'ADS') {
    return 'ADS'
  }
  // Add space before uppercase letters
  if (typeof str === 'string') {
    const convertedStr = str.replace(/([A-Z])/g, ' $1');
    // Capitalize the first letter of each word and trim any leading/trailing spaces
    const normalizedStr = convertedStr.trim().split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return normalizedStr;
  }
  return str
};

export const convertContainsColons = (str) => {
  // Check if the input is a string and contains '::'
  if (typeof str === 'string' && str.includes('::')) {
    // Extract the string value after ':::'
    const convertedStr = str.split('::')[1].trim();
    // Split the converted string by '::' and return the last element
    return convertedStr;
  }

  return str;
};
