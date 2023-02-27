export const mappedLastReadingsIrricomList = (obj) => {
    return obj?.map((item) => {
        return {
            probe: item.ProbeNo,
            readingSent: item.DatumOntvang,
            readingTime: item.DatumLesing,
            moist1: item.m1,
            moist2: item.m2,
            moist3: item.m3,
            moist4: item.m4,
            moist5: item.m5,
            moist6: item.m6,
            temp1: item.t1,
            temp2: item.t2,
            temp3: item.t3,
            temp4: item.t4,
            temp5: item.t5,
            temp6: item.t6,
            volts: item.Volts,
            airtime: item.airtime,
            signal: item.csq,
            irricom: item.ICNommer,
            fw: item.fw,
            IMEI: item.imei
        };
    });
};

export const mappedLastReadingsReadingsList = (obj) => {
    return obj?.map((item) => {
        return {
            probe: item.ProbeNo,
            readingSent: item.DatumOntvang,
            readingTime: item.DatumLesing,
            moist1: item.m1,
            moist2: item.m2,
            moist3: item.m3,
            moist4: item.m4,
            moist5: item.m5,
            moist6: item.m6,
            temp1: item.t1,
            temp2: item.t2,
            temp3: item.t3,
            temp4: item.t4,
            temp5: item.t5,
            temp6: item.t6,
            volts: item.Volts,
            type: item.type
        };
    });
};

export const mappedLastReadingsVoltsAndSignal = (data) => {
    return data?.map(item => {
        return {
            date: item?.DatumLesing,
            Volts: parseFloat(item.Volts),
            Signal: parseInt(item.csq)
        };
    });
};
