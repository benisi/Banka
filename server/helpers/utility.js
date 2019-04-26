class Utility {
  static convertToArray(data) {
    const outputData = [];
    if ((typeof data === 'object')) {
      data.forEach((element) => {
        outputData.push(typeof element === 'string' ? element.trim() : element);
      });
      return outputData;
    }
    return [data];
  }

  static generateAccountNumber(type, trackId) {
    const accountCode = type === 'current' ? 300 : 120;
    const branchCode = 115;
    const accountId = trackId;
    return `${branchCode}${accountCode}${accountId}`;
  }
}

export default Utility;
