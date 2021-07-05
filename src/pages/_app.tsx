import { ChakraProvider } from "@chakra-ui/react";
import { pageview } from "@lib/gtag";
import theme from "@styles/theme";
import { META } from "config";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url: unknown) => {
			pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);
	return (
		<>
			<Head>
				<title>{META.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Provider session={pageProps.session}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</Provider>
		</>
	);
}
