require('dotenv').config()

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: process.env.TOKEN,
  }

module.exports = headers
