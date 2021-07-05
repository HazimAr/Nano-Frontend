import Foot from "./footer";
import Head from "./header";

// eslint-disable-next-line import/no-default-export
export default function HeadFoot({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<>
			<Head />
			{children}
			<Foot />
		</>
	);
}
