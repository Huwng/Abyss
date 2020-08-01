const h = require(`nekos.life`)
const neko = new h()
module.exports = {
    name:'owoify',
    description:"back to the elemetary school lol",
    category:"weeb stuff",
    usage:"<text>",
    aliases:["owo"],
    execute(message, args){
        async function work() {
            let owo = await neko.sfw.OwOify({text : `${args.join(' ')}`})
            message.channel.send(owo.owo)
        }
        work()
    }
}