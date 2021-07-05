// Put Types and interfaces here
export type DiscordUser = {
	session: {
		user: {
			name: string;
			id: number;
			image: string;
		};
	};
};
