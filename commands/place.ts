import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { i18n } from "../utils/i18n";
import { createObject } from "../utils/placeUtils";
export default {
  data: new SlashCommandBuilder()
    .setName("place")
    .setDescription(i18n.__("place.description"))
    .addIntegerOption((option) => option.setName("x").setDescription(i18n.__("place.args.x")).setRequired(true))
    .addIntegerOption((option) => option.setName("y").setDescription(i18n.__("place.args.y")).setRequired(true))
    .addStringOption((option) => option.setName("link").setDescription(i18n.__("place.args.URL")).setRequired(true)),

  async execute(interaction: ChatInputCommandInteraction) {
    const url = interaction.options.getString("URL")!;
    const x = interaction.options.getInteger("x")!;
    const y = interaction.options.getInteger("y")!;

    try {
      const pasteLink = await createObject(url, x, y);
      const FINAL_URL = `https://new.reddit.com/r/place/?jsontemplate=${pasteLink}&screenmode=fullscreen&cx=${x}&cy=${y}&px=47`;
      return interaction.reply(
        `Działa. Obiekt został stworzony na podstawie podanych argumentów.\nLink do reddita: ${FINAL_URL}`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Wystąpił błąd podczas tworzenia pasty na Pastebin.");
    }
  }
};
