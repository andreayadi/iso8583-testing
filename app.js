"use strict";

const form = document.querySelector(".form");
let isoMsg = document.querySelector(".iso__message");
isoMsg.value =
  "ISO0260000770200B23AC40128E5901C00000000000001BC000000000001000100062202352400000109352406220622062259999011100000140020375260512000000230=22012205721450205000000000002758TESTGJK1005000224164   SPOTS*KANTIN KARYAWAN JAKARTA      ID 62015A789012        027005000224164       00000000360565D43FFB7365610016        00000000020        000         00514140029LOKASILOKASILOKASILOKASIL0000020                  P202000000025460000002546009000001001012  GOJKB24 12038000000000000000                    000";

// isoMsg.value =
//   "ISO0060000600800822000000000000004000000000000000620150944001989301";
const container = document.querySelector(".container");
const parseMessage = (e) => {
  e.preventDefault();
  let message;
  message = isoMsg.value;

  message = getHeader(message);
  message = getMti(message);
  const objData = getBitMap(message);
  const { bitActive, bodyMessage } = objData;
  let currActive;
  let value;
  let lengthNeed;
  message = bodyMessage;
  for (let i = 1; i < bitActive.length; i++) {
    if (bitActive.charAt(i) === "1") {
      currActive = i + 1;
      const dataActive = dataElement.find((el) => el.field === currActive);
      if (dataActive.fixed) {
        value = message.slice(0, dataActive.length);
        addingData(dataActive.usage, value);
        message = message.substring(dataActive.length);
      } else {
        lengthNeed = message.slice(0, dataActive.length);
        value = message.slice(0, parseInt(lengthNeed) + dataActive.length);
        addingData(dataActive.usage, value);
        message = message.substring(parseInt(lengthNeed) + dataActive.length);
      }
    } else {
    }
  }
};

form.addEventListener("submit", parseMessage);

// FUNCTIONS
const addingData = (title, value) => {
  const html = `<div class="data__container">
  <div class="data__name">${title}</div>
  <div class="data__colon">:</div>
  <div class="data__value">${value}</div>
</div>`;
  container.insertAdjacentHTML("beforeend", html);
};

const getHeader = (message) => {
  const length = 12;
  const header = message.slice(0, length);
  addingData("Header", header);
  return message.substring(length);
};

const getMti = (message) => {
  const length = 4;
  const mti = message.slice(0, length);
  addingData("MTI", mti);
  return message.substring(length);
};

const getBitMap = (message) => {
  const length = 16;
  const primBitmap = message.slice(0, length);
  addingData("Primary Bitmap", primBitmap);
  const primBitmapBiner = hex2bin(primBitmap);

  if (primBitmapBiner.charAt(0) === "1") {
    message = message.substring(length);
    const secBitmap = message.slice(0, length);
    addingData("Secondary Bitmap", secBitmap);
    console.log(secBitmap);
    const secBitmapBiner = hex2bin2(secBitmap);
    console.log(secBitmapBiner);
    const allBit = primBitmapBiner + secBitmapBiner;

    return {
      bitActive: allBit,
      bodyMessage: message.substring(length),
    };
  } else {
    return {
      bitActive: primBitmapBiner,
      bodyMessage: message.substring(length),
    };
  }
};

// Hex To Bin
const hex2bin2 = (hex) => {
  return parseInt(hex, 16).toString(2).padStart(64, "0");
};

const hex2bin = (hex) => {
  let out = "";
  for (const data of hex) {
    switch (data) {
      case "0":
        out += "0000";
        break;
      case "1":
        out += "0001";
        break;
      case "2":
        out += "0010";
        break;
      case "3":
        out += "0011";
        break;
      case "4":
        out += "0100";
        break;
      case "5":
        out += "0101";
        break;
      case "6":
        out += "0110";
        break;
      case "7":
        out += "0111";
        break;
      case "8":
        out += "1000";
        break;
      case "9":
        out += "1001";
        break;
      case "A":
        out += "1010";
        break;
      case "B":
        out += "1011";
        break;
      case "C":
        out += "1100";
        break;
      case "D":
        out += "1101";
        break;
      case "E":
        out += "1110";
        break;
      case "F":
        out += "1111";
        break;
      default:
        return "";
    }
  }
  return out;
};

const dataElement = [
  {
    field: 1,
    type: "bitmap",
    fixed: true,
    length: 64,
    MaxLength: 64,
    usage: "bitmap",
  },
  {
    field: 3,
    type: "number",
    fixed: true,
    length: 6,
    MaxLength: 6,
    usage: "Processing Code",
  },
  {
    field: 4,
    type: "number",
    fixed: true,
    length: 12,
    MaxLength: 12,
    usage: "Amount Transaction",
  },
  {
    field: 7,
    type: "number",
    fixed: true,
    length: 10,
    MaxLength: 10,
    usage: "Transmission date & time",
  },
  {
    field: 11,
    type: "number",
    fixed: true,
    length: 6,
    MaxLength: 6,
    usage: "System trace audit number (STAN)",
  },
  {
    field: 12,
    type: "number",
    fixed: true,
    length: 6,
    MaxLength: 6,
    usage: "Local transaction time (hhmmss)",
  },
  {
    field: 13,
    type: "number",
    fixed: true,
    length: 4,
    MaxLength: 4,
    usage: "Local transaction date (MMDD)",
  },
  {
    field: 15,
    type: "number",
    fixed: true,
    length: 4,
    MaxLength: 4,
    usage: "Settlement date",
  },
  {
    field: 17,
    type: "number",
    fixed: true,
    length: 4,
    MaxLength: 4,
    usage: "Capture date",
  },
  {
    field: 18,
    type: "number",
    fixed: true,
    length: 4,
    MaxLength: 4,
    usage: "Merchant type, or merchant category code",
  },
  {
    field: 22,
    type: "number",
    fixed: true,
    length: 3,
    MaxLength: 3,
    usage: "Point of service entry mode",
  },
  {
    field: 32,
    type: "number",
    fixed: false,
    length: 2,
    maxLength: 11,
    usage: "Acquiring institution identification code",
  },
  {
    field: 35,
    type: "track 2 data",
    fixed: false,
    length: 2,
    maxLength: 37,
    usage: "Track 2 data",
  },
  {
    field: 37,
    type: "alphanumeric",
    fixed: true,
    length: 12,
    maxLength: 12,
    usage: "Retrieval reference number",
  },
  {
    field: 41,
    type: "alphanumericsymbol",
    fixed: true,
    length: 8,
    maxLength: 8,
    usage: "Card acceptor terminal identification",
  },
  {
    field: 42,
    type: "alphanumericsymbol",
    fixed: true,
    length: 15,
    maxLength: 15,
    usage: "Card acceptor identification code",
  },
  {
    field: 43,
    type: "alphanumericsymbol",
    fixed: true,
    length: 40,
    maxLength: 40,
    usage: "Card acceptor name/location",
  },
  {
    field: 46,
    type: "alphanumeric",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Additional data (ISO)",
  },
  {
    field: 48,
    type: "alphanumeric",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Additional data (private)",
  },
  {
    field: 49,
    type: "alphan or umeric",
    fixed: true,
    length: 3,
    maxLength: 3,
    usage: "Additional data (private)",
  },
  {
    field: 52,
    type: "bitmap",
    fixed: true,
    length: 16,
    maxLength: 16,
    usage: "Personal identification number data",
  },
  {
    field: 60,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved (national)",
  },
  {
    field: 61,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved (private)",
  },
  {
    field: 62,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved (private)",
  },
  {
    field: 70,
    type: "number",
    fixed: true,
    length: 3,
    maxLength: 3,
    usage: "Reserved (private)",
  },
  {
    field: 120,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved for private use",
  },
  {
    field: 121,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved for private use",
  },
  {
    field: 123,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved for private use",
  },
  {
    field: 124,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved for private use",
  },
  {
    field: 125,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved for private use",
  },
  {
    field: 126,
    type: "alphanumericsymbol",
    fixed: false,
    length: 3,
    maxLength: 999,
    usage: "Reserved for private use",
  },
];
// 1, 3, 4, 7, 11, 12, 13, 15, 17, 18, 22, 32, 35, 37, 41, 42, 43, 46, 48, 49, 52, 60, 61, 62, 120 ,121, 123, 124, 125, 126
