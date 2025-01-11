require('dotenv').config();
const Banchojs = require("bancho.js");
const axios = require("axios");

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const APIKEY = process.env.APIKEY;
const PREFIX = "!";

const client = new Banchojs.BanchoClient({
  username: USERNAME,
  password: PASSWORD
});

const handlePM = async ({ message, user }) => {
  console.log(`Received message from ${user.ircUsername}: ${message}`);
  
  if (user.ircUsername === USERNAME) return;
  if (message[0] !== PREFIX) return;

  const command = message.split(" ")[0].toLowerCase();

  switch (command) {
    case PREFIX + "hello":
      console.log(`Responding to ${user.ircUsername} with "Hello there ${user.ircUsername} :)"`);
      return await user.sendMessage(`Hello there ${user.ircUsername} :)`);
    case PREFIX + "help":
      console.log(`Responding to ${user.ircUsername} with help message`);
      return await user.sendMessage(`All command are in [https://github.com/Bibou1494/BibouOsu-Bancho-Bot GitHub]`);
    case PREFIX + "howareyou":
      console.log(`Responding to ${user.ircUsername} with "Sorry I'm a bot so I can't reply :("`);
      return await user.sendMessage(`Sorry I'm a bot so I can't reply :(`);
    case PREFIX + "support":
      console.log(`Responding to ${user.ircUsername} with support message`);
      return await user.sendMessage(`If you need more support, you can check my [http://bibounetwork.ddns.net/forum/liste-topics/?id=7 forum].`);
    case PREFIX + "about":
      console.log(`Responding to ${user.ircUsername} with about message`);
      return await user.sendMessage(`About me: I'm a normal osu! player. I'm here just for fun so I don't care about PP or the score.`);
    case PREFIX + "aboutbot":
      console.log(`Responding to ${user.ircUsername} with about bot message`);
      return await user.sendMessage(`About the bot: Hey I'm a bot made by [https://osu.ppy.sh/users/Nxd_Bibou1494 Nxd_Bibou1494]. My creator wanted me to have a random map to download but he still doesn't know how to do that.`);
    case PREFIX + "random":
      try {
        console.log(`Fetching random map for ${user.ircUsername}`);
        const response = await axios.get(`https://osu.ppy.sh/api/get_beatmaps?k=${APIKEY}`);
        console.log(`Received data from API:`, response.data);

        if (response.data.length === 0) {
          console.log(`No beatmaps found for ${user.ircUsername}`);
          return await user.sendMessage(`Sorry, no beatmaps found.`);
        }

        const beatmap = response.data[Math.floor(Math.random() * response.data.length)];
        console.log(`Responding to ${user.ircUsername} with random map: ${beatmap.title}`);
        return await user.sendMessage(`Hey, here is a random map: [https://osu.ppy.sh/b/${beatmap.beatmap_id} ${beatmap.title} - ${beatmap.artist} - ${beatmap.difficultyrating}*]`);
      } catch (error) {
        console.error(`Error fetching random map for ${user.ircUsername}:`, error);
        return await user.sendMessage(`Sorry, there was an error fetching a random map.`);
      }
  }
};

const startOsuBot = async () => {
  try {
    await client.connect();
    console.log("osu!Bancho Connected. Thanks for login.");

    client.on("PM", handlePM);
  } catch (err) {
    console.error("Error connecting to osu!Bancho:", err);
  }
};

startOsuBot();

module.exports = { handlePM };
