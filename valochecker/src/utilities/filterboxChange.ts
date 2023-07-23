import { Dispatch, SetStateAction } from 'react'

interface FilterChangeEvent {
  target: {
    value: string
  }
}

export function handleFilterBoxChange(
  setSelectedOption: Dispatch<SetStateAction<string>>
) {

  return (event: FilterChangeEvent) => {

    const option = event.target.value

    setSelectedOption(prev => {
      if (prev === option && option !== 'No Filter') {
        return 'No Filter'
      } else {
        return option
      }
    })

  }

}
