const aws = require("aws-sdk")

async function publishToSns(results) {
    console.log("Starting publishing to SNS")
    const config = {
        region: "eu-west-1"
    }
    const sns = new aws.SNS({
        region: "eu-west-1",
    })

    const messages = results.data.messages.map((msg) => ({
        headers: JSON.parse(msg.map._raw).request.headers,
        body: JSON.parse(msg.map._raw).request.body,
    }))

    const updatedMessages = messages.map((message, index) => ({
        Id: `${index + 1}`,
        Message: message,
        MessageGroupId: "register",
    }))

    const CHUNK_SIZE = 10
    const chunksCount = Math.ceil(updatedMessages.length / CHUNK_SIZE)
    const chunks = Array(chunksCount).map((_, index) =>
        updatedMessages.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE)
    )

    await Promise.all(chunks.map(async (chunk) => {
        await sns.publishBatch({
            TopicArn: 'arn:aws:sns:eu-west-1:690512443060:hitesh_shipman_test.fifo',
            PublishBatchRequestEntries: chunk,
        }).promise().catch(error => {
            console.log({
                event: "Chunk publish failed",
                chunk,
                error,
                from,
                to
            })
        })
    }))
    console.log("Done publishing to SNS")
}

module.exports = publishToSns