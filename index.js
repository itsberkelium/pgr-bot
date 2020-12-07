const dotenv = require("dotenv").config();
const { default: Axios } = require("axios");
const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "!pgr";

const url = process.env.URL || "http://localhost";
const API = Axios.create({
  baseURL: `${url}`,
});

client.on("ready", () => {
  console.log(`Ready to roll as ${client.user.tag}`);
  client.user.setActivity("F1", { type: "WATCHING" });
});

client.on("message", function (message) {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length + 1);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(
      `Pong! This message had a latency of ${timeTaken}ms. Also, hello!`
    );
  }

  if (command === "pilotlar") {
    API.get("driver")
      .then((r) => {
        const { data } = r;

        const embed = new Discord.MessageEmbed();

        embed.setTitle("PGR Racing Pilotları");

        data.map((driver) => {
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
  }

  if (command === "yedekpilotlar") {
    API.get("driver?optionsonly=true").then((r) => {
      const { data } = r;

      if (data.length) {
        const embed = new Discord.MessageEmbed();

        embed.setTitle("PGR Racing Yedek Pilotları");

        data.map((driver) => {
          embed.addField(driver.name, `${driver.psn}`, true);
        });

        message.reply(embed);
      } else message.reply("henüz yedek pilot bulunmuyor.");
    });
  }

  if (command === "takımlar") {
    API.get("team").then((r) => {
      const { data } = r;

      const embed = new Discord.MessageEmbed();

      embed.setTitle("PGR Racing Takımları");

      data.map((team) => {
        embed.addField(team.title, `Şampiyonluk: ${team.championships}`, true);
      });

      message.reply(embed);
    });
  }
});

client.login(process.env.BOT_TOKEN);
