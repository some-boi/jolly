import { Bot, BotWithCache, Message } from "@deps";
import { addCommand, JollyCommand } from "@classes/command.ts";
import { send } from "@utils/send.ts";
import { warning } from "@classes/database.ts";
import { JollyEmbed } from "@classes/embed.ts";

class Case extends JollyCommand {
    constructor() {
        super("case", "moderation", {
            description: "Show a warn info by case ID",
            usage: "<case id>",
            aliases: ["caseid", "showcase", "showwarn", "warnshow", "warninfo"]
        })
    }

    override async run(message: Message, args: string[], client: BotWithCache<Bot>) {
        if (!args[0]) return await send(client, message.channelId, "Missing Case ID")
        const warn = warning.getByCaseID(args[0])
        if (!warn) return await send(client, message.channelId, "Cannot find that warning!")
        const em = new JollyEmbed()
            .warn(warn)
        return await send(client, message.channelId, em)
    }
}

addCommand(new Case())