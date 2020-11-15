import { sendMessage } from "../../deps.ts";
import { createCommand } from "../utils/helpers.ts";

createCommand({
  name: `avatar`,
  guildOnly: true,
  execute: (message, _args, guild) => {
    const memberID = message.mentions[0] || message.author.id;
    const member = guild?.members.get(memberID);
    if (!member) return;

    return sendMessage(message.channelID, {
      embed: {
        author: {
          name: member.tag,
          icon_url: member.avatarURL,
        },
        image: {
          url: member.avatarURL,
        },
      },
    });
  },
});
