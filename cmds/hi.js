const Discord = require(`discord.js`)
const client = new Discord.Client()
module.exports = {
    name:'hi',
    description:"dis a hi cmd",
    execute(message, args){
        async function test() {
        const m = await message.channel.send("Wait for a lil bit please..").then((m) => m.edit(`Hi there, ${message.author}! Your ping is ${m.createdTimestamp - message.createdTimestamp}ms.`) )
        //m.edit(`Hi there! ${message.author}, Your ping is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`)
        //the above is what could've been if client.ws.ping doesnt return a NaN i hate my life
        }
        test()
    }
}