/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGuild } from "@api/server";
import { VStack } from "@chakra-ui/react";
import CreateCustom from "@components/dashboard/custom/createCustom";
import YourCommands from "@components/dashboard/custom/yourCommands";
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";

export default function Custom({ session, guild, guild_id }): JSX.Element {
	// console.log(guild);
	// console.log(session);
	const commands = guild.customCommands
		? Object.keys(guild.customCommands).map((command_id) => {
				const command = guild.customCommands[command_id];
				command.command_id = command_id;
				return command;
		  })
		: [];
	return (
		<Layout session={session}>
			<VStack w="100%">
				<CreateCustom
					guild_id={guild_id}
					token={session.accessToken}
					guild={guild.mongoGuild}
					command_id={
						Object.keys(guild.mongoGuild.customCommands).length + 1
					}
				/>

				<YourCommands guild={guild.mongoGuild} commands={commands} />
			</VStack>
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

	const guild_id = context.req.cookies.guild;

	const guild = await getGuild(guild_id);

	return { props: { session, guild, guild_id } };
}
