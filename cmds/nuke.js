const auth = require(`../main.js`).admin
module.exports = {
    name:'nuke',
    description:"nuke the entire channel",
    category:"admin stuff",
    aliases:["kimjongun", "wipe"],
    execute(message, args){
        if (message.author.id != auth) return message.reply('ya aint foolin me lmao')
        async function wipe() {
            let pos = message.channel.position
            message.channel.clone().then((m) => {
                m.setPosition(pos)
                m.send(`bye!`, { files: ['http://www.quickmeme.com/img/cf/cfe8938e72eb94d41bbbe99acad77a50cb08a95e164c2b7163d50877e0f86441.jpg'] })
            })
            message.channel.delete() 
        }
        wipe()
    }
}