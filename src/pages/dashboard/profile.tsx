/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center } from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import { getSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

export default function Four({ session }: any): JSX.Element {
	const router = useRouter();
	return (
		<Layout session={session}>
			<Center h="100%">
				<Button
					onClick={async () => {
						await signOut();
						await router.push("/");
					}}
				>
					Log Out
				</Button>
			</Center>
		</Layout>
	);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	if (!session) {
		context.res.writeHead(307, {
			Location: "/login",
		});
		context.res.end();
	}

	return { props: { session } };
}
