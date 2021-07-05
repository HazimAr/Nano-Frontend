
import { DiscordUser } from "types";
import Foot from "./footer";
import Head from "./header";

// eslint-disable-next-line import/no-default-export
export default function HeadFoot({
	children,
	session,
}: {
	children: React.ReactNode;
	session: DiscordUser;
}): JSX.Element {
	return (
		<>
			<Head session={session} />
			{children}
			<Foot />
		</>
	);
}
