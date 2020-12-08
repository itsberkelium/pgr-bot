const API = require("../API");

const Discord = require("discord.js");

module.exports = {
  name: "yedekpilotlar",
  description: "Yedek pilotların listesi",
  execute(message, args, prefix) {
    API.get("driver?optionsonly=true").then((r) => {
      const { data } = r;

      if (data.length) {
        const embed = new Discord.MessageEmbed();

        embed.setTitle("PGR Racing Yedek Pilotları");

        data.forEach((driver) => {
          embed.addField(driver.name, `${driver.psn}`, true);
        });

        message.reply(embed);
      } else message.reply("henüz yedek pilot bulunmuyor.");
    });
  },
};
