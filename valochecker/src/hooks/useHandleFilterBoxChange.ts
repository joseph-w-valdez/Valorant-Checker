import { Dispatch, SetStateAction, ChangeEvent } from 'react';
/* import { useNavigate } from 'react-router-dom'; */

export const useHandleFilterBoxChange = (

  setSelectedOption: Dispatch<SetStateAction<string>>
) => {
  /* const navigate = useNavigate(); */

  return (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;

    setSelectedOption((prevOption) =>
      prevOption === option && option !== 'No Filter' ? 'No Filter' : option
    );
    /* console.log('location.pathname', location.pathname) */
    /* navigate(`${location.pathname}&filter=${option === 'No Filter' ? 'none' : option}`); */
  };
};
