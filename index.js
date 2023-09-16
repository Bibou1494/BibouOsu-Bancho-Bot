const Banchojs = require("bancho.js");

const USERNAME = "Nxd_Bibou1494"
const PASSWORD = "11916c5d"

const client = new Banchojs.BanchoClient({
  username: USERNAME,
  password: PASSWORD
});

const prefix = "!";

const startOsuBot = async () => {
  try {
    await client.connect();
    console.log("osu!Bancho Connected...");

    client.on("PM", async ({ message, user }) => {
      //Check if message was sent by ourselves
      if (user.ircUsername === USERNAME) return;

      //Check for message prefix
      if (message[0] !== "!") return;

      const command = message.split(" ")[0].toLowerCase();

      switch (command) {
        case prefix + "hello":
          return await user.sendMessage(`Hello there ${user.ircUsername}`);
		case prefix + "help":
			return await user.sendMessage(`All command are in [https://github.com/Bibou1494/BibouOsu-Bancho-Bot GitHub]`)
      };
    });

  } catch (err) {
    console.error(err);
  }
};

startOsuBot();
