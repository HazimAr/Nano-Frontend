/* eslint-disable no-void */
import { signOut } from "next-auth/client";
import { useEffect } from "react";

export default function Logout(): JSX.Element {
	useEffect(() => {
		void signOut();
	}, []);
	return <>Signed Out</>;
}
