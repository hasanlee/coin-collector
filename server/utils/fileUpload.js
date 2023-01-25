const path = require("path");
const { v4: uuidv4 } = require("uuid");

const fileUpload = (file) => {
  if (!file) {
    const error = new Error("No files were uploaded.");
    error.status = 400;
    throw error;
  }
  const extName = path.extname(file.name);
  let fileName = `${file.md5}${extName}`;
  file.mv(`./public/uploads/${fileName}`, (err) => {
    if (err) {
      const error = new Error(err);
      error.status = 500;
      throw error;
    }
  });
  return fileName;
};

module.exports = { fileUpload };
