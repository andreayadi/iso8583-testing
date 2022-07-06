// Hex To Bin
const hex2bin = (hex) => {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
};

const testing = "00000000000001BC";

console.log(hex2bin(testing));
