const axios = require("axios")
const headers = require('./headers')
const sleep = require('./helper')


async function getStatus(jobId) {
  const baseUrl = "https://api.us2.sumologic.com/api/v1/search/jobs"
  console.log("Getting the query status")
  let jobReport, jobStatusResponse
  do {
    try {
      jobStatusResponse = await axios.get(
        `${baseUrl}/${jobId}`,
        {
          headers,
        }
      )
      jobReport = jobStatusResponse.data
      await sleep(1000)
    } catch (e) {
      console.log(e)
    }
  } while (
    jobReport.state === "GATHERING RESULTS" ||
    jobReport.state === "GATHERING RESULTS FROM SUBQUERIES" || jobStatusResponse.status === 429
  )
  console.log("Got the query status")
  return jobReport
}


module.exports = getStatus
