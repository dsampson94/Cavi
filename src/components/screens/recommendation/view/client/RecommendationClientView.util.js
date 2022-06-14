export const toggleAllDropdowns = (allDropdownsExpanded, fieldList, activeTableData, setActiveTableData) => {
  if (allDropdownsExpanded) {
    const copyOfActiveList = [...fieldList];
    activeTableData?.forEach((listItem, index) => {
      fieldList?.splice(index + 1, 1,
        { ...copyOfActiveList[index + 1], expanded: false });
    });
    setActiveTableData([...fieldList]);
  } else {
    const copyOfActiveList = [...fieldList];
    activeTableData?.forEach((listItem, index) => {
      fieldList?.splice(index + 1, 1,
        { ...copyOfActiveList[index + 1], expanded: true });
    });
    setActiveTableData([...fieldList]);
  }
};

export const toggleDropdownAfterSearch = (fieldList, selectedDropdownObject, filteredTableData, selectedIndex, setFilteredTableData) => {
  const copyOfActiveList = [...fieldList];
  fieldList?.forEach((listItem, index) => {
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

export const toggleDropdown = (fieldList, filteredTableData, selectedIndex, setActiveTableData) => {
  const copyOfActiveList = [...fieldList];
  fieldList?.splice(selectedIndex + 1, 1,
    { ...copyOfActiveList[selectedIndex + 1], expanded: !fieldList[selectedIndex + 1].expanded });
  setActiveTableData([...fieldList]);
};
