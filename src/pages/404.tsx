import { Heading } from '@chakra-ui/react';
import { withRouter } from 'next/router';

const Four = withRouter((props) => {
	console.log(props);

	return (
		<Heading>
			<br />
			404 Page not Found
			<br />
			<br />
			{/* {props.router.query.error} */}
		</Heading>
	);
});

export default Four;
