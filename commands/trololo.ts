import {
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  GuildMemberRoleManager,
  SlashCommandBuilder,
  TextChannel
} from "discord.js";
import { config } from "../utils/config";
import { i18n } from "../utils/i18n";
export default {
  data: new SlashCommandBuilder()
    .setName("trololo")
    .setDescription(i18n.__("trololo.description"))
    .addMentionableOption((option) =>
      option.setName("kogo").setDescription(i18n.__("trololo.args.kogo")).setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("ile").setDescription(i18n.__("trololo.args.ileRazy")).setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const kogo = interaction.options.getMember("kogo")!;
    const ile = interaction.options.getInteger("ile")!;

    let roles = (interaction.member!.roles as GuildMemberRoleManager).cache;
    let isGej = roles.some((role) => role.name === "twojamamagej");
    if (isGej) return interaction.reply(`Twoja mama gej xDDDDD`);
    if (ile < 1) return interaction.reply(`Nie mogę wysłać mniej niż 1 wiadomość`);
    if (ile > 7) return interaction.reply(`Nie mogę wysłać więcej niż 7 wiadomości`);
    await interaction.reply(`${kogo}`);
    for (let i = 0; i < ile - 1; i++) {
      (interaction.channel as TextChannel).send(`${kogo}`);
    }
  }
};
