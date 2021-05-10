const API = require("../API");

const Discord = require("discord.js");

module.exports = {
  name: "puanlar",
  description: "Sezon puan listesi",
  usage: `!pgr puanlar: Geçerli sezon pilotlar puan tablosu\n!pgr puanlar <sezon>: İstenen bir sezonun puan tablosu`,
  execute(message, args, prefix) {
    API.get("season/table/driver")
      .then((r) => {
        const { data } = r;

        const embed = new Discord.MessageEmbed();

        embed.setTitle("PGR Racing Pilotlar Puan Tablosu");

        data.forEach((d, i) => {
          embed.addField(
            `${i + 1} - ${d.driver.name}`,
            `Puan: ${d.points}`,
            false
          );
        });

        message.reply(embed);
      })
      .catch((err) => console.log(err));
  },
};
