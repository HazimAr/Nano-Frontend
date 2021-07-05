// Put Types and interfaces here
export type DiscordUser = {
	session: {
		user: {
			/** The user's postal address. */
			name: string;
			id: number;
			image: string;
		};
	};
};
