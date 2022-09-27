export const mapTemperatureLists = (
  oneHundredMmList,
  twoHundredMmList,
  threeHundredMmList,
  fourHundredMmList,
  sixHundredMmList,
  eightHundredMmList,
  fieldChartList,
  probeNumber) => {
  Object.entries(fieldChartList?.[probeNumber])?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey) => {
      switch (innerKey) {
        case 'D1':
          oneHundredMmList.push({ x: key, y: value.T1 });
          return;
        case 'D2':
          twoHundredMmList.push({ x: key, y: value.T2 });
          return;
        case 'D3':
          threeHundredMmList.push({ x: key, y: value.T3 });
          return;
        case 'D4':
          fourHundredMmList.push({ x: key, y: value.T4 });
          return;
        case 'D5':
          sixHundredMmList.push({ x: key, y: value.T5 });
          return;
        case 'D6':
          eightHundredMmList.push({ x: key, y: value.T6 });
          return;
      }
    });
  });

  Object.entries(fieldChartList?.Grafieke)?.forEach(([key, value]) => {
    Object.keys(value).forEach((innerKey) => {
      switch (innerKey) {
        case 'TBSim':
          oneHundredMmList.push({ x: key, y: null });
          twoHundredMmList.push({ x: key, y: null });
          threeHundredMmList.push({ x: key, y: null });
          fourHundredMmList.push({ x: key, y: null });
          sixHundredMmList.push({ x: key, y: null });
          eightHundredMmList.push({ x: key, y: null });
          return;
      }
    });
  });
};

export const pushMappedTemperatureLists = (
  oneHundredMmList,
  twoHundredMmList,
  threeHundredMmList,
  fourHundredMmList,
  sixHundredMmList,
  eightHundredMmList,
  mappedTemperaturesList) => {

  mappedTemperaturesList.push(oneHundredMmList);
  mappedTemperaturesList.push(twoHundredMmList);
  mappedTemperaturesList.push(threeHundredMmList);
  mappedTemperaturesList.push(fourHundredMmList);
  mappedTemperaturesList.push(sixHundredMmList);
  mappedTemperaturesList.push(eightHundredMmList);
};
