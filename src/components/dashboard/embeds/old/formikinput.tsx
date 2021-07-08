import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { FieldProps, getIn } from "formik";

const CFormikInput = ({ field, form: { errors, touched } }: FieldProps) => {
	const error = getIn(errors, field.name);
	const touch = getIn(touched, field.name);
	const invalid = touch && error;
	return (
		<FormControl isInvalid={invalid}>
			<Input {...field} />
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
};

export default CFormikInput;
