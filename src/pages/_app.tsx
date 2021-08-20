import ProgressBar from '@badrap/bar-of-progress';
import { ChakraProvider } from '@chakra-ui/react';
import { pageview } from '@lib/gtag';
import theme from '@styles/theme';
import { META } from 'config';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	const router = useRouter();

	const progress = new ProgressBar({
		size: 2,
		color: theme.colors.brand.secondary,
		delay: 0,
	});

	useEffect(() => {
		const handleRouteChange = (url: unknown) => {
			pageview(url);
		};
		router.events.on('routeChangeStart', progress.start);
		router.events.on('routeChangeComplete', progress.finish);
		router.events.on('routeChangeError', progress.finish);
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => router.events.off('routeChangeComplete', handleRouteChange);
	}, [router.events]);

	return (
		<>
			<Head>
				<title>{META.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Provider session={pageProps.session}>
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
			</Provider>
		</>
	);
}
