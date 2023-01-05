const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config({ path: __dirname + "/./../.env" });
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
var cron = require("cron");
const fs = require("fs");
const path = require("path");
const { EmbedBuilder } = require("discord.js");

// Instantiate the bot
client.on("ready", () => {
  console.log("Ready!");
  // send message on startup
  client.channels.cache.get(process.env.TEST_CHANNEL_ID).send("Hi gays!");

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  let commands;
  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.command;
  }
});

// Command handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
});

//cron job to check users anniversary
const cronJob = new cron.CronJob(
  "0 0 8 * * *",
  function () {
    //Check every user that has the role "Trustable"
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const role = guild.roles.cache.find((role) => role.name === "Trustable");
    const members = role.members;
    members.forEach((member) => {
      //Check if user has been on the server for each milestone
      if (member.joinedTimestamp + 31536000000 < Date.now()) {
        //Create message for 1 year
        const oneYear = new EmbedBuilder()
          .setTitle("Happy anniversary !!")
          .setColor("#E75EFF")
          //set description with user mention
          .setDescription(
            `Hey ${member}! You've been on the server for 1 year! Drinks on me!`
          )
          .setTimestamp();
        //Send message to general channel
        client.channels.cache
          .get(process.env.GENERAL_CHANNEL_ID)
          .send({ embeds: [oneYear] });
      } else if (member.joinedTimestamp + 47304000000 < Date.now()) {
        //Create message for 1.5 years
        const oneAndHalfYears = new EmbedBuilder()
          .setTitle("Happy half anniversary!!")
          .setColor("#E75EFF")
          .setDescription(
            `Hey ${member}! You've been on the server for 1.5 years! We're getting old!`
          )
          .setTimestamp();
        //Send message to general channel
        client.channels.cache
          .get(process.env.GENERAL_CHANNEL_ID)
          .send({ embeds: [oneAndHalfYears] });
      } else if (member.joinedTimestamp + 63072000000 < Date.now()) {
        //Create message for 2 years
        const twoYears = new EmbedBuilder()
          .setTitle("Happy anniversary !!")
          .setColor("#E75EFF")
          .setDescription(
            `Hey ${member}! You've been on the server for 2 years! Here's a cake!`
          )
          .setTimestamp();
        //Send message to general channel
        client.channels.cache
          .get(process.env.GENERAL_CHANNEL_ID)
          .send({ embeds: [twoYears] });
      }
    });
  },
  null,
  true,
  "Europe/Paris"
);
cronJob.start();

client.login(process.env.DISCORD_TOKEN);
