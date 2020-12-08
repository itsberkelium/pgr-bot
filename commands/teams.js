const API = require("../API");

const Discord = require("discord.js");

module.exports = {
  name: "takımlar",
  description: "Takımların listesi",
  execute(message, args, prefix) {
    API.get("team").then((r) => {
      const { data } = r;

      const embed = new Discord.MessageEmbed();

      embed.setTitle("PGR Racing Takımları");

      data.forEach((team) => {
        embed.addField(team.title, `Şampiyonluk: ${team.championships}`, true);
      });

      message.reply(embed);
    });
  },
};
