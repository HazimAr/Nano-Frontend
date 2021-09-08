// google analytics measurement id
const GA_TRACKING_ID = '';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

type MetaType = {
	title: string;
	lang: string;
	description: string;
	url: string;
	image: string;
};

const META: MetaType = {
	title: '',
	lang: 'en-us',
	description: '',
	url: '',
	image: '',
};

const DISCORD_BASE_URL = 'https://discord.com/api/v9';

export { GA_TRACKING_ID, IS_PRODUCTION, META, DISCORD_BASE_URL };
