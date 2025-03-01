import { Bot, BotWithCache, config, Message } from "@deps";
import { send } from "@utils/send.ts";

export const bumpReminder = async (client: BotWithCache<Bot>, message: Message): Promise<void> => {
    if (config.plugins.bump.enable && message.interaction?.name == "bump"
        && message.authorId === 302050872383242240n) {
        await send(client, message.channelId, `I will remind you to bump again in two hours!`)
        setTimeout(async () => {
            return await send(client, message.channelId, {
                content: "Hey <@&$ID>, reminder to `/bump` again!".replace("$ID", config.plugins.bump.roleID),
                allowedMentions: {
                    roles: [BigInt(config.plugins.bump.roleID)]
                }
            });
        }, 7200000)
        return
    }
}