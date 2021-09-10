import { ChakraProvider } from '@chakra-ui/react';
import theme from '@styles/theme';
import { META } from 'config';
import { Provider as NextAuthProvider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>{META.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NextAuthProvider session={pageProps.session}>
				<ChakraProvider theme={theme}>
					<Component
						{...pageProps}
						style={{
							webkit_scrollbar: {
								background: '#000000',
								width: '2px',
							},
							webkit_scrollbar_track: {
								boxShadow: 'inset 0 0 2px #1A1A1D',
							},
							webkit_scrollbar_thumb: { background: '#66FCF1' },
						}}
					/>
				</ChakraProvider>
			</NextAuthProvider>
		</>
	);
}
