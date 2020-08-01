module.exports = {
    name:'judge',
    description:"ask a yes/no question and the high elders will decide your fate",
    category:"fun stuff",
    aliases:["ask","vote"],
    usage:"<questions>",
    execute(message, args){
        if (!args) return message.reply("pass a question first, man.")
        message.reply("let's ask the high elders and have them judge.")
        message.channel.send("<:walter:735057094277070938> <:staringfish:735057011057754142> <:staringham:735057177923813407> <:swagcat:735058649558548536>")
        let vote = ""
        let acc = 0
        for (i=1; i<=4; ++i) {
            let r = Math.random()
            if (r >= 0.5) {
                vote = `${vote}:white_check_mark:`
                acc = acc+1
            } else {
                vote = `${vote}:negative_squared_cross_mark:`
            }
        }
        message.channel.send(vote)
        if (acc>=2) {
            message.channel.send(`The high elders have judged, they agree with you with \`${acc}/4\` vote`)
        } else {
            message.channel.send(`The high elders have judged, they **do not** agree with you with \`${acc}/4\` vote`)
        }
    }
} 