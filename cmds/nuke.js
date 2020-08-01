module.exports = {
    name:'nuke',
    description:"nuke the entire channel",
    category:"admin stuff",
    aliases:["kimjongun", "wipe"],
    execute(message, args){
        async function wipe() {
            let pos = message.channel.position
            message.channel.clone().then((c) => {
                c.setPosition(pos)
                c.send(`bye!`, { files: ['http://www.quickmeme.com/img/cf/cfe8938e72eb94d41bbbe99acad77a50cb08a95e164c2b7163d50877e0f86441.jpg'] })
            })
            message.channel.delete() 
        }
        wipe()
    }
}