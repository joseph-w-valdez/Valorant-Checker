import { useEffect } from 'react';

export const useDataFilter = (
  data: any[],
  dataType: string,
  filterValue: string,
  setFilteredData: (data: any[]) => void,
  setCurrentPage: (page: number) => void
) => {
  useEffect(() => {
    if (dataType !== 'individual-weapon') {
      const filtered = data.filter((item) =>
      item.displayName.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset the current page  to 1 when the filter changes
     }
  }, [data, filterValue]);
};
