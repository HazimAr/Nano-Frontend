import Selects from "react-select";

export default function Select(props): JSX.Element {
	return (
		<Selects
			options={props.options}
			styles={{
				option: (provided: any, state: { isSelected: any }) => ({
					...provided,
					borderBottom: "1px solid white",
					backgroundColor: state.isSelected ? "#fab107" : "#7549ac",
				}),

				singleValue: (provided: any, state: { isDisabled: any }) => {
					const opacity = state.isDisabled ? 0.5 : 1;
					const transition = "opacity 300ms";

					return { ...provided, opacity, transition };
				},
			}}
			{...props}
		/>
	);
}
