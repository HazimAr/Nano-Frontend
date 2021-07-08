/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getId } from "@api/discord";
import { getUser } from "@api/server";
import CreateCustom from "@components/dashboard/custom/createCustom";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";
import { DiscordUser } from "types";

export default function Custom({
	session,
	user,
	guild_id,
}: {
	session: DiscordUser;
	user: any;
	guild_id: string;
}): JSX.Element {
	console.log(user);
	return (
		<Layout session={session}>
			<CreateCustom guild_id={guild_id} session={session} user={user} />
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
		return { props: { session } };
	}
	if (!context.req.cookies.guild) {
		context.res.writeHead(307, {
			Location: "/dashboard",
		});
		context.res.end();
		return { props: { session } };
	}

	// const guild_id = "199325828843044865";
	const guild_id = context.req.cookies.guild;
	// @ts-expect-error its not dum dum
	const id = await getId(session?.accessToken);
	const user = await getUser(id);

	return { props: { session, user, guild_id } };
}
