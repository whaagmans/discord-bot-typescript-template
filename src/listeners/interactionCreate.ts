import {
	Client,
	CommandInteraction,
	Events,
	Interaction,
	ModalSubmitInteraction,
} from 'discord.js';
import { Commands } from 'src/Commands';

const interactionCreate = (client: Client): void => {
	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (interaction.isCommand() || interaction.isContextMenuCommand()) {
			await handleSlashCommand(interaction);
		}
		if (interaction.isModalSubmit()) {
			await handleModalSubmit(interaction);
		}
	});
};

const handleModalSubmit = async (interaction: ModalSubmitInteraction) => {
	const username = interaction.fields.getTextInputValue('usernameInput');
	const password = interaction.fields.getTextInputValue('passwordInput');
	interaction.reply({
		content: `thx for these fields: ${username} ${password}`,
	});
};

const handleSlashCommand = async (
	interaction: CommandInteraction
): Promise<void> => {
	const slashCommand = Commands.find(
		(c) => c.data.name === interaction.commandName
	);
	if (!slashCommand) {
		interaction.followUp({ content: 'an error has occurred' });
		return;
	}

	slashCommand.run(interaction);
};

export default interactionCreate;
