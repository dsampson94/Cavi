export const mappedMonitorProbesList = (obj) => {
  const result = [];
  for (let group in obj?.data) {
    for (let location in obj?.data?.[group]) {
      for (let sensor in obj?.data?.[group][location]) {
        let data = obj?.data[group][location][sensor];
        const item = {
          group: data?.groepnaam,
          location: `${ data?.plaasnaam } - ${ data?.land }`,
          age: data?.age,
          probeNumber: data?.probeno,
          icNumber: data?.ic_nommer,
          signalStrength: data?.signal,
          rainfall: data?.rain,
          probeStatus: data?.probe_status,
          latitude: data?.latitude,
          longitude: data?.longitude,
          volts: data?.volts,
          redVoltage: data?.voltsRed,
          firmwareVersion: data?.fw,
          lastReading: data?.lastreading,
          lastChange: data?.lastchange,
          airtime: data?.airtime
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
