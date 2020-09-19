const discord = require(`discord.js`)
module.exports = {
    name:'covid',
    description:"get covid-19 stats",
    category:"uncategorized",
    aliases:["corona", "ncovi"],
    execute(message, args){
        const MessageEmbed = new discord.MessageEmbed()
        const embed = MessageEmbed
        .setDescription(`Covid-19 stats in Vietnam`)
        .setFooter(`requested by ${message.author.tag}, API by Juno_okyo, data from the Vietnamese MOH`)
        .setTimestamp(message.createdAt)
        var request = require("request") //deprecated library lets GO
        var jar = request.jar()
        jar.setCookie(request.cookie("__cfduid=d2369a2174fe0a56e233bda9e1dbcaf311596379217"), "https://code.junookyo.xyz/api/ncov-moh/")
        var options = {method: 'GET', url: 'https://code.junookyo.xyz/api/ncov-moh/', jar: 'JAR'}
        request(options, function (error, response, body) {
            if (error) throw new Error(error)
            let json = JSON.parse(body)
            embed.addField(`Total cases`, json.data.vietnam.cases, true)
            embed.addField(`Deaths`, json.data.vietnam.deaths,true)
            embed.addField(`Recovered`, json.data.vietnam.recovered,true)
            message.channel.send(embed)
        })
        
    }
}