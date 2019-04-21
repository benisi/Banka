class Utility {
  static convertToArray(data) {
    return typeof data === 'object' ? [...data] : [data];
  }

  static generateAccountNumber(type, trackId) {
    const accountCode = type === 'current' ? 300 : 120;
    const branchCode = 115;
    const accountId = trackId;
    return `${branchCode}${accountCode}${accountId}`;
  }
}

export default Utility;
