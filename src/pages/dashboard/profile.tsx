/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import { getSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

export default function Four({ session }: any): JSX.Element {
	const router = useRouter();
	return (
		<Layout session={session}>
			<Button
				onClick={async () => {
					await signOut();
					await router.push(
						`https://osu.ppy.sh/oauth/authorize?client_id=${OSU_V2ID}&redirect_uri=https://nano-osu.teamdragonsden.com/signin-osu&response_type=code&scope=public&state=${state}`
					);
				}}
			>
				Sign in with Osu
			</Button>
			<Button
				onClick={async () => {
					await signOut();
					await router.push("/");
				}}
			>
				Log Out
			</Button>
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
	}

	return { props: { session } };
}
