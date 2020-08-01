module.exports = {
    name:'quote',
    description:"plainly repeat what you say",
    category:"general",
    aliases:["parrot", "say"],
    execute(message, args) {
        message.reply(args.join(' '))
    }
}