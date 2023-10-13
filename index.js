const Banchojs = require("bancho.js");

const USERNAME = "YOUR USERNAME"
const PASSWORD = "IRC PASSWORD"
const APIKEY = "YOUR API KEY"

const client = new Banchojs.BanchoClient({
  username: USERNAME,
  password: PASSWORD
});

const startOsuBot = async () => {
  try {
    await client.connect();
    console.log("osu!Bancho Connected. Thanks for login.");

    client.on("PM", async ({ message, user }) => {
      //Check if message was sent by ourselves
      if (user.ircUsername === USERNAME) return;

      //Check for message prefix
      if (message[0] !== "!") return;

      const command = message.split(" ")[0].toLowerCase();

      switch (command) {
        case prefix + "hello":
          return await user.sendMessage(`Hello there ${user.ircUsername} :)`);
        case prefix + "help":
          return await user.sendMessage(`All command are in [https://github.com/Bibou1494/BibouOsu-Bancho-Bot GitHub]`);
        case prefix + "howareyou":
          return await user.sendMessage(`Sorry i'm a bot so i can't reply :(`);
        case prefix + "support":
          return await user.sendMessage(`if you need more support, u can check my [http://bibounetwork.ddns.net/forum/liste-topics/?id=7 forum].`);
        case prefix + "about":
          return await user.sendMessage(`About me : I'm a normal osu! player. I'm here just for fun so i don't care about PP or the score.`);
        case prefix + "aboutbot":
          return await user.sendMessage(`About the bot: Hey I'm a bot made by [https://osu.ppy.sh/users/Nxd_Bibou1494 Nxd_Bibou1494]. My creator wanted me to have a random map to download but he still doesn't know how to do that`);
          // get beatmaps https://osu.ppy.sh/api/get_beatmaps?k=OSUAPI
        case prefix + "random":
          return await user.sendMessage(`Hey. take a random map: [https://osu.ppy.sh/b/ coming soon]`)
      };
    });

  } catch (err) {
    console.error(err);
  }
};

startOsuBot();
