const query = "_sourceCategory=103308/CT/LT/pikachu/shipman/production \"/api/v1/shipments\\\"\" \"POST\""
const timezone = "IST"
const timeIntervalInMs = 10 * 60 * 1000 //10 minutes
var from = new Date(Date.now() - timeIntervalInMs).toISOString().slice(0, -5)
var to = new Date(Date.now()).toISOString().slice(0, -5)

//This is for when we use eventbridge time property which is in "event"
//var to = event.slice(0,-1)
//var from = new Date(new Date(to) - timeIntervalInMs).toISOString().slice(0,-2)  

const input = {
    query,
    from,
    to,
    timezone
}

module.exports = input