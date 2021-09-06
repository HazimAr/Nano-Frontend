/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DiscordUser } from 'types';
import Foot from './footer';
import { Header } from './header';

// eslint-disable-next-line import/no-default-export
export default function HeadFoot({ children, session }: { children: React.ReactNode; session: DiscordUser }): JSX.Element {
	return (
		<>
			{/* @ts-ignore */}
			<Header session={session} />
			{children}
			<Foot />
		</>
	);
}
