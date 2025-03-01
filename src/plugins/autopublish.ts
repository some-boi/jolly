import { Bot, BotWithCache, config, Message } from "@deps";

export async function autoPublish(client: BotWithCache<Bot>, message: Message, requireBot: boolean, channel: string[]): Promise<void> {
    if (requireBot && !message.isFromBot) return;
    const autopublish = config.plugins.autoPublish
    if (!autopublish.enable) return;
    if (!channel.includes(String(message.channelId))) return;
    try {
        await client.helpers.publishMessage(message.channelId, message.id)
    } catch { return; }
    return
}