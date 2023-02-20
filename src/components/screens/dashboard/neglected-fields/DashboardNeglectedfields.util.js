export const mappedNeglectedFieldsList = (obj) => {
  return obj?.map((item) => {
    return {
      group: item?.groepnaam,
      database: `${ item?.plaasnaam }`,
      field: `${ item?.land }`,
      lastReading: item?.ts
    };
  });
};
