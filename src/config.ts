// google analytics measurement id
const GA_TRACKING_ID = '';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

type MetaType = {
	title: string;
	lang: string;
	description: string;
	url: string;
};

const META: MetaType = {
	title: '',
	lang: 'en-us',
	description: '',
	url: '',
};

const SERVER_URL = IS_PRODUCTION ? 'https://nano-osu.teamdragonsden.com' : 'https://69dc-2600-1700-3930-e5b0-55f5-46c5-afb0-2ff4.ngrok.io';

const DISCORD_BASE_URL = 'https://discord.com/api/v9';

export { GA_TRACKING_ID, IS_PRODUCTION, META, SERVER_URL, DISCORD_BASE_URL };
