const createJob = require('./sumologic/create-job')
const getStatus = require('./sumologic/get-status')
const getMessages = require('./sumologic/get-messages')
const publishToSns = require('./adapters/sns')
//exports.handler = async (event) => {
async function main() {
    const job = await createJob()
    const jobId = job.id
    const jobReport = await getStatus(jobId)
    const results = await getMessages(jobId, jobReport)
    await publishToSns(results)
}
main()
//}