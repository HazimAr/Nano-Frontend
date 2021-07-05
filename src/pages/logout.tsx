import { signOut } from "next-auth/client";

export default async function Logout(): Promise<JSX.Element> {
	await signOut();
	window.location.href = "/";

	return <>Signing Out</>;
}
