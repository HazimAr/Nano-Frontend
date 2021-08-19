export function _Commands({ commands }) {
	return commands.map((cmd) => (
		<h1 key={cmd.name}>
			Name: {cmd.name}
			<br />
			Enabled: {cmd.enabled && 'true'}
		</h1>
	));
}
