const API = require("../API");

const Discord = require("discord.js");

module.exports = {
  name: "pilotlar",
  description: "Aktif pilotların listesi",
  execute(message, args, prefix) {
    API.get("driver")
      .then((r) => {
        const { data } = r;

        const embed = new Discord.MessageEmbed();

        embed.setTitle("PGR Racing Pilotları");

        data.forEach((driver) => {
          embed.addField(
            driver.name,
            `${driver.team.title}\n${driver.psn}\nŞampiyonluk: ${driver.championships}`,
            true
          );
        });

        embed.setFooter(
          `Yedek pilotları görmek için "${prefix} yedekpilotlar" komutunu kullanın.`
        );

        message.reply(embed);
      })
      .catch((err) => console.log(err));
  },
};
