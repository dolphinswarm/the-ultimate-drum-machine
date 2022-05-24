export const convertArrayToRecord = (array: any[], property: string) => {
    const record: Record<string, any> = {};
    array.forEach((item) => {
        record[item[property]] = item;
    });
    return record;
};
