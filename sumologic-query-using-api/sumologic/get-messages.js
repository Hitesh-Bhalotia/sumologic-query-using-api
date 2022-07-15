const axios = require("axios")
const headers = require('./headers')
const sleep = require('./helper')

async function getMessages(jobId, jobReport) {
  const baseUrl = "https://api.us2.sumologic.com/api/v1/search/jobs"
  console.log("Getting the messages")
  const results = await axios.get(
    `${baseUrl}/${jobId}/messages?offset=0&limit=${jobReport.messageCount}`,
    { headers }
  )
  console.log("Got the messages")
  if (results.status === 429) {
    await sleep(1000)
    return getMessages(jobId, jobReport)
  }
  console.log(`Total message count: ${jobReport.messageCount}`)
  return results
}

module.exports = getMessages