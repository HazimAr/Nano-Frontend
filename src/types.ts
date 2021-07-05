// Put Types and interfaces here
export type DiscordUser = {
	user: {
		name: string;
		id: number;
		image: string;
	};

	expires: string;
	accessToken: string;
};
