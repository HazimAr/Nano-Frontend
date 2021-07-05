// google analytics measurement id
const GA_TRACKING_ID = "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

type MetaType = {
	title: string;
	lang: string;
	description: string;
	url: string;
};

const META: MetaType = {
	title: "",
	lang: "en-us",
	description: "",
	url: "",
};

const DB_URL = "https://example.com";
const DISCORD_BASE_URL = "https://discord.com/api/v9";

export { GA_TRACKING_ID, IS_PRODUCTION, META, DB_URL, DISCORD_BASE_URL };
