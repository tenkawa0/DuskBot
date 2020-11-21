// This file is meant to show how you can create multiple commands in the same file if you wish.
import { botCache, cache, sendMessage, addReactions } from "../../deps.ts";
import { createCommand } from "../utils/helpers.ts";
import { Embed } from "../utils/Embed.ts";

createCommand({
  name: `roulette`,
  description: "commands/ping:DESCRIPTION",
  botChannelPermissions: ["SEND_MESSAGES"],
  execute: async function (message) {
    const embed = new Embed()
      .setTitle("武器ルーレット")
      .setFooter(
        "武器ルーレットに参加する人は✋のリアクションで参加表明してください"
      );

    const createMessage = await sendMessage(message.channelID, {
      embed: embed,
    });

    await addReactions(message.channelID, createMessage.id, ["✋", "💣"]);
  },
});
