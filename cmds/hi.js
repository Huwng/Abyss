const main = require(`../main.js`)
const client = main.clarinet
module.exports = {
    name:'hi',
    description:"dis a hi cmd",
    category:"general",
    aliases:["hello", "ping"],
    execute(message, args){
        async function test() {
            await message.channel.send("Wait for a lil bit please..").then((m) => 
            m.edit(`Hi there! ${message.author}, Your ping is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`))
        }
        test()
    }
}