 const Discord = require("discord.js");
    const client = new Discord.Client()
        client.login(process.env.token)
module.exports = client;