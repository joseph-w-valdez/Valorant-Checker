import { Dispatch, SetStateAction, ChangeEvent } from 'react';

export const useHandleFilterBoxChange = (
  setSelectedOption: Dispatch<SetStateAction<string>>
) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption((prevOption) =>
      prevOption === option && option !== 'No Filter' ? 'No Filter' : option
    );
  };
};
