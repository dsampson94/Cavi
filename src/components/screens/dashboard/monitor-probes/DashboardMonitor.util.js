export const mappedMonitorProbesList = (obj) => {
  const result = [];
  for (let group in obj?.data) {
    for (let location in obj?.data?.[group]) {
      for (let sensor in obj?.data?.[group][location]) {
        let data = obj?.data[group][location][sensor];
        const item = {
          group: data?.groepnaam,
          database: `${ data?.plaasnaam }`,
          field: `${ data?.land }`,
          // age: data?.age,
          probe: data?.probeno,
          IC: data?.ic_nommer,
          lastReading: data?.lastreading,
          lastSent: data?.lastchange,
          // rainfall: data?.rain,
          // latitude: data?.latitude,
          // longitude: data?.longitude,
          // redVoltage: data?.voltsRed,
          FW: data?.fw,
          airtime: data?.airtime?.slice(0, -1),
          volts: data?.volts,
          voltsRed: data?.voltsRed,
          signal: data?.signal,
          active: data?.probe_status
        };
        result.push(item);
      }
    }
  }
  return result;
};

export const mappedAdminUserList = (data) => {
  return data?.map((name, index) => {
    return {
      id: index + 1,
      name: name
    };
  });
};
