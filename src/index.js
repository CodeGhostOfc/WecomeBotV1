const { Client,GatewayIntentBits, EmbedBuilder, Events } = require('discord.js');

require('dotenv').config();

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ============================================================
// Channel IDs
// ============================================================

const welcomeChannelId = 'YOUR_WELCOME_CHANNEL_ID';
const goodbyeChannelId = 'YOUR_GOODBYE_CHANNEL_ID';

// ============================================================
// Event: When a new member joins
// ============================================================

client.on(Events.GuildMemberAdd, async (member) => {
    try {
        const channel = member.guild.channels.cache.get(welcomeChannelId);

        if (!channel) {
            console.log(`[WELCOME] Channel with ID ${welcomeChannelId} was not found.`);  return;
        }

        if (!channel.isTextBased()) {
            console.log(`[WELCOME] Channel with ID ${welcomeChannelId} is not a text channel.`); return;
        }
        const avatar = member.user.displayAvatarURL({extension: 'png', size: 1024});

        const welcomeEmbed = new EmbedBuilder()
            .setColor(0x57F287)
            .setAuthor({
                name: `${member.user.username} joined the server`,
                iconURL: avatar
            })
            .setTitle('🎉 Welcome!')
            .setDescription(`Welcome ${member} to **${member.guild.name}**!\n\n` + `We're happy to have you here.`)
            .setThumbnail(avatar)
            .addFields(
                {
                    name: '👤 Member',
                    value: `${member}`,
                    inline: true
                },
                {
                    name: '👥 Member Count',
                    value: `${member.guild.memberCount.toLocaleString()}`,
                    inline: true
                },
                {
                    name: '🌐 Server',
                    value: `**${member.guild.name}**`,
                    inline: false
                }
            )
            .setFooter({text: `Member #${member.guild.memberCount}`})
            .setTimestamp();

        await channel.send({
            content: `🎉 Welcome ${member} to **${member.guild.name}**!`,
            embeds: [welcomeEmbed]
        });

        console.log(`[WELCOME] ${member.user.tag} joined ${member.guild.name}`);

    } catch (error) {
        console.error('[WELCOME] Error:', error);
    }
});

// ============================================================
// Event: When a member leaves
// ============================================================

client.on(Events.GuildMemberRemove, async (member) => {
    try {
        const channel = member.guild.channels.cache.get(goodbyeChannelId);

        if (!channel) {
            console.log(`[GOODBYE] Channel with ID ${goodbyeChannelId} was not found.`); return;
        }

        if (!channel.isTextBased()) {
            console.log(`[GOODBYE] Channel with ID ${goodbyeChannelId} is not a text channel.`); return;
        }
        const avatar = member.user.displayAvatarURL({extension: 'png', size: 1024});

          const goodbyeEmbed = new EmbedBuilder()   
            .setColor(0xED4245)
            .setAuthor({name: `${member.user.username} left the server`, iconURL: avatar})
            .setTitle('👋 Goodbye!')
            .setDescription(`**${member.user.username}** has left **${member.guild.name}**.` )
            .setThumbnail(avatar)
            .addFields(
                {
                    name: '👤 Member',
                    value: member.user.username,
                    inline: true
                },
                {
                    name: '👥 Member Count',
                    value: `${member.guild.memberCount.toLocaleString()}`,
                    inline: true
                },
                {
                    name: '🌐 Server',
                    value: `**${member.guild.name}**`,
                    inline: false
                }
            )
            .setFooter({text: `${member.guild.memberCount.toLocaleString()} members remaining`})
            .setTimestamp();

        await channel.send({content: `👋 **${member.user.username}** has left **${member.guild.name}**.`, embeds: [goodbyeEmbed] });
        console.log(`[GOODBYE] ${member.user.tag} left ${member.guild.name}`);

    } catch (error) {
        console.error('[GOODBYE] Error:', error);
    }
});

// ============================================================
// Bot Login
// ============================================================

client.login(process.env.token);