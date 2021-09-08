import { Grid, Heading, HStack, Image, Stack, VStack } from "@chakra-ui/react";

export default function Info(): JSX.Element {
	return (
		<HStack h="100%" justify="center" py={20} mx={10}>
			<Stack justify="center" h="50%">
				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						lg: "repeat(1, 1fr)",
					}}
					gap={20}
				>
					<InfoSection
						title="ENDLESS CUSTOMIZATION"
						src="/gif/customization.gif"
					/>
					<InfoSection
						title="THIRTY PLAYER LOBBIES"
						src="/gif/30.gif"
					/>
					<InfoSection
						title="UNIQUE FIGHTING MECHANICS"
						src="/gif/fun.gif"
					/>
					<InfoSection
						title="SATISFYING PVP ENCOUNTERS"
						src="/gif/sat.gif"
					/>
				</Grid>

				{/* <Image src="/gif/customization.gif" w="500px" />
				<Image src="/gif/fun.gif" w="500px" />
				<Image src="/gif/sat.gif" w="500px" /> */}
			</Stack>
		</HStack>
	);
}

function InfoSection({ src, title, ...props }) {
	return (
		<VStack {...props}>
			<Heading>{title}</Heading>
			<Image src={src} w="700px" alt={title.toLowerCase()} rounded={5} />
		</VStack>
	);
}
