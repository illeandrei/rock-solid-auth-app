const fs = require("fs");
const secretExport = `
//hold app secrets and configs
exports.secret = "to-replace-with-gibbrish(optional)";
`;

fs.writeFile("config.js", secretExport, err => {
  if (err) throw err;
  console.log("config.js file created!");
});
