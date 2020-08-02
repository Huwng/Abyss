const discord = require(`discord.js`)
const h = require(`nekos.life`)
const neko = new h()
const MessageEmbed = new discord.MessageEmbed()

module.exports = {
    name:'hug',
    description:"send some hug",
    category:"weeb stuff",
    usage:"<user(s)>",
    execute(message, args){
        async function test() {
            function getUserFromMention(mention) {
                if (!mention) return
                if (mention.startsWith('<@') && mention.endsWith('>')) {
                    mention = mention.slice(2, -1)
                    if (mention.startsWith('!')) {
                        mention = mention.slice(1)
                    }
                    return client.users.cache.get(mention)
                }
            }
            const embed = MessageEmbed
            .setTimestamp(message.createdAt)
            .setFooter(`requested by ${message.author.tag}, image provided by nekos.life`, message.author.displayAvatarURL())
            if (!message.mentions.everyone) {
                console.log(`why tf this run?`)
                if (!message.mentions.users.size) {
                    return message.reply('please, atleast mention someone to hug, you can\'t just leave this empty like that')
                }
                let mentioned = args
                console.log(mentioned)
                console.log(Array.isArray(mentioned))
                var c
                var u
                let bot = false
                for (c in mentioned) {
                    u = getUserFromMention(c)
                    if (u == undefined) continue
                    if (u.bot) return message.reply('can you hug something that doesn\'t exist?')
                    if (u.includes(`<@${message.author.id}`) || u.includes(`<@!${message.author.id}`)) {
                    return message.reply('why\'re you hugging yourself?')
                    }
                }
                console.log(mentioned.size)
                if (mentioned.length === 1) {embed.setDescription(`${message.author} hugged ${mentioned}`)}
                else {embed.setDescription(`${message.author} sent a group hug to ${mentioned.join(`, `)}`)}
            }
            else embed.setDescription(`${message.author} sent a hug to everyone!`)
            let url = await (await neko.sfw.hug()).url
            embed.setImage(url)
            message.channel.send(embed)
        }
        test()
    }
}