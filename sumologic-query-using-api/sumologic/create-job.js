const axios = require("axios")
const headers = require('./headers')
const input = require('./input')
const sleep = require('./helper')


async function createJob() {
  const baseUrl = "https://api.us2.sumologic.com/api/v1/search/jobs"
  console.log("Started getting job id")
  const createdJob = await axios.post(
    `${baseUrl}`,
    input,
    {
      headers,
    }
  )
  if (createdJob.status === 429) {
    await sleep(1000)
    return createJob()
  }
  console.log("Got the job id")
  return createdJob.data
}

module.exports = createJob