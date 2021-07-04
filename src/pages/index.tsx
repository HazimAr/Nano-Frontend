import Button from "@components/button";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";

export default function Home(): JSX.Element {
	return (
		<Container>
			<ContainerInside bg="bg.secondary" h={100}>
				<Button>Open Dashboard</Button>
			</ContainerInside>
		</Container>
	);
}
