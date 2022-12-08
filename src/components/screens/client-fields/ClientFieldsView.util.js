export const toggleAllDropdowns = (allDropdownsExpanded, mappedFieldList, activeTableData, setActiveTableData) => {
  if (!mappedFieldList) return;
  if (allDropdownsExpanded) {
    const copyOfActiveList = [...mappedFieldList];
    activeTableData?.forEach((listItem, index) => {
      mappedFieldList?.splice(index + 1, 1,
        { ...copyOfActiveList[index + 1], expanded: true });
    });
    setActiveTableData([...mappedFieldList]);
  } else {
    const copyOfActiveList = [...mappedFieldList];
    activeTableData?.forEach((listItem, index) => {
      mappedFieldList?.splice(index + 1, 1,
        { ...copyOfActiveList[index + 1], expanded: false });
    });
    setActiveTableData([...mappedFieldList]);
  }
};

export const toggleDropdownAfterSearch = (mappedFieldList, selectedDropdownObject, filteredTableData, selectedIndex, setFilteredTableData) => {
  if (!mappedFieldList) return;
  const copyOfActiveList = [...mappedFieldList];
  mappedFieldList?.forEach((listItem, index) => {
    if (selectedDropdownObject?.fieldName?.locationName === listItem?.fieldName?.locationName) {
      if (filteredTableData[selectedIndex + 1].expanded) {
        filteredTableData?.splice(selectedIndex + 1, 1,
          { ...copyOfActiveList[index + 1], expanded: false });
        setFilteredTableData([...filteredTableData]);
      } else {
        filteredTableData?.splice(selectedIndex + 1, 0,
          { ...copyOfActiveList[index + 1], expanded: true });
        setFilteredTableData([...filteredTableData]);
      }
    }
  });
};

export const toggleDropdown = (mappedFieldList, filteredTableData, selectedIndex, setActiveTableData) => {
  if (!mappedFieldList) return;
  const copyOfActiveList = [...mappedFieldList];
  mappedFieldList?.splice(selectedIndex + 1, 1,
    { ...copyOfActiveList[selectedIndex + 1], expanded: !mappedFieldList[selectedIndex + 1].expanded });
  setActiveTableData([...mappedFieldList]);
};
