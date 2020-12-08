const Discord = require("discord.js");

module.exports = {
  name: "yardım",
  description: "List all of my commands or info about a specific command.",
  usage: "[yardım komutismi]",
  cooldown: 5,
  execute(message, args, prefix) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Kullanabileceğin bütün komutlarım bunlar:");
      data.push(commands.map((command) => command.name).join(", "));
      data.push(
        `\n${prefix} yardım komutismi şeklinde belirli bir komut hakkında yardım alabilirsin.`
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("bütün komutlarımı sana özel mesaj ile gönderdim!");
        })
        .catch((error) => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "Sana özel mesaj gönderemedim. Özel mesajların kapalı olabilir mi?"
          );
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Komut:** ${command.name}`);

    if (command.description) data.push(`**Açıklama:** ${command.description}`);
    if (command.usage) data.push(`**Kullanım şeklid:** ${command.usage}`);

    message.channel.send(data, { split: true });
  },
};
