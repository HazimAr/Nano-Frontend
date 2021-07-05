/* eslint-disable no-void */
import { signOut } from "next-auth/client";
import { useEffect } from "react";

export default function Logout(): JSX.Element {
	useEffect(() => {
		void signOut();
		window.location.href = "/";
	}, []);
	return <>Signing Out{}</>;
}
