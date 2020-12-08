const API = require("../API");

const Discord = require("discord.js");

module.exports = {
  name: "yarışsonucu",
  description: "Yarış sonuçları",
  usage: `!pgr yarışsonucu: En son yarış sonucu\n!pgr yarışsonucu <yarış sırası>: İstenen yarış sonucu\n!pgr yarışsonucu <sezon> <yarış sırası>: İstenen bir sezondaki yarış sonucu`,
  execute(message, args, prefix) {
    let request;
    if (!args.length) {
      request = API.get("race-result/latest");
    } else if (args.length === 1) {
      request = API.get(`race-result/order/${args[0]}`);
    } else if (args.length === 2) {
      request = API.get(`race-result/season/${args[0]}/order/${args[1]}`);
    }

    if (request) {
      request
        .then((r) => {
          const { data } = r;

          const embed = new Discord.MessageEmbed();

          embed.setTitle(
            `${data.season.name} Sezonu ${data.circuit.name} Yarışı Sonuçları`
          );

          data.race.forEach((race) => {
            data.qualifying.some((qualifying) => {
              if (qualifying.driver._id === race.driver._id) {
                embed.addField(
                  `${race.pos}. ${race.driver.name}`,
                  `Sıralama: ${qualifying.pos}`
                );
                return true;
              }
              return false;
            });
          });

          embed.setFooter(
            `En hızlı tur: ${data.fastestDriver.name} - ${data.fastestLap}`
          );

          message.reply(embed);
        })
        .catch((err) => console.log(err));
    }
  },
};
