import {
  botCache,
  getReactions,
  editMessage,
  botID,
  chooseRandom,
} from "../../deps.ts";
import { processReactionCollectors } from "../utils/collectors.ts";
import { Embed } from "../utils/Embed.ts";
import { weapons as data } from "../data/weapon.ts";
import { icons } from "../data/icon.ts";

botCache.eventHandlers.reactionAdd = async function (message, emoji, userID) {
  // Process reaction collectors.
  //await processReactionCollectors(message, emoji, userID);

  if (emoji.name === "💣" && userID !== botID) {
    // ルーレット参加者を取得
    const reactions = await getReactions(message, "✋");
    const users = await reactions.reduce((accmulator, current) => {
      if (current.id !== botID) {
        accmulator.push(current.tag ? current.tag : current.username);
      }
      return accmulator;
    }, []);
    if (!users.length) return;

    const embed = new Embed()
      .setTitle("武器ルーレット")
      .setFooter(
        "武器ルーレットに参加する人は✋のリアクションで参加表明してください"
      );
    if (users.length > 10) {
      embed.setDescription("```参加人数オーバー```");
      await editMessage(message, {
        embed: embed,
      });
      return;
    }

    const results = await users.reduce((accmulator, current) => {
      const weapons = Array.from(new Set(data));
      const weapon = weapons.splice(
        Math.floor(Math.random() * weapons.length),
        1
      );
      accmulator.push(weapon[0]);
      return accmulator;
    }, []);

    console.log(users);
    console.log(results);
    // console.log(message);

    users.forEach((user, index) => {
      embed.addField(
        [icons[index], user].join(""),
        ["```", chooseRandom(results[index].value), "```"].join("")
      );
    });

    await editMessage(message, {
      embed: embed,
    });
  }
};
