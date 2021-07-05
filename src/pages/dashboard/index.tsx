/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@components/dashboard/layout";
import { getSession } from "next-auth/client";

export default function Four({ session }: any): JSX.Element {
	return <Layout session={session}>Home</Layout>;
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: "login",
		});
		context.res.end();
	}

	return { props: { session } };
}
