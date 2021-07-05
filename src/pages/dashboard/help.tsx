/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";

export default function Custom({ session }: DiscordUser): JSX.Element {
	return <Layout session={session}>Custom</Layout>;
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: "/",
		});
		context.res.end();
	}

	return { props: { session } };
}
