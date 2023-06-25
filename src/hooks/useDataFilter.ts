import { useState, useEffect } from 'react';

export const useDataFilter = (data: any[], filterValue: string, dataType: string) => {
  const [filteredData, setFilteredData] = useState<any[]>(data);

  useEffect(() => {
    if (dataType !== 'individual-weapon') {
      const filtered = data.filter((item) =>
        item.displayName.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, filterValue, dataType]);

  return filteredData;
};
