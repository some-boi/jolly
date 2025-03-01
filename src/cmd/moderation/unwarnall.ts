import { Bot, BotWithCache, Message, User } from "@deps";
import { addCommand, JollyCommand } from "@classes/command.ts";
import { send } from "@utils/send.ts";
import { warning } from "../../classes/database.ts";
import { findUser } from "../../utils/find.ts";

class UnWarnAll extends JollyCommand {
    constructor() {
        super("unwarnall", "moderation", {
            owner: true
        })
    }

    override async run(message: Message, args: string[], client: BotWithCache<Bot>) {
        if (!args[0]) return await send(client, message.channelId, "Who do you want to remove all of their warnings?")
        const mentionUser = message.mentionedUserIds
        let user: User | undefined
        if (mentionUser.length >= 1) {
            user = await findUser(client, mentionUser[0].toString())
        } else {
            user = await findUser(client, args[0])
        }
        if (!user) return await send(client, message.channelId, "That user is not found")
        warning.removeAll(user.id)
        return await send(client, message.channelId, "Successfully removed all warnings!")
    }
}

addCommand(new UnWarnAll())