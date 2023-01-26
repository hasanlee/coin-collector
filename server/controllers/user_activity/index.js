const { connection } = require("../../db");
const { trycatch } = require("../../utils/trycatch");
const { fileUpload } = require("../../utils/fileUpload");

//const funcTemplate = trycatch(async (req, res, next) => {});

module.exports = { login, register };
