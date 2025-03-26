const fs = require("fs");
// const path = require("path");

/**
 * @param {string} filePath - Path file JSON
 * @returns {object|null} - Data JSON
 */
const readJsonFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: ${filePath} not found.`);
      return null;
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`❌ Error reading JSON file: ${error.message}`);
    return null;
  }
};

module.exports = { readJsonFile };