const fs = require("fs");
const dotenv = require("dotenv").config();
const Discord = require("discord.js");
const API = require("./API");

const client = new Discord.Client();

const prefix = "!pgr";

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Ready to roll as ${client.user.tag}`);
  client.user.setActivity("F1", { type: "WATCHING" });
});

client.on("message", function (message) {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length + 1);
  const args = commandBody.split(" ");
  const commandName = args.shift().toLowerCase();

  if (commandName === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms!`);
  }

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`Eksik komut gönderdin, ${message.author}!`);
  }

  try {
    command.execute(message, args, prefix);
  } catch (error) {
    console.error(error);
    message.reply("Bu komutu çalıştırırken hata oluştu!");
  }
});

client.login(process.env.BOT_TOKEN);
