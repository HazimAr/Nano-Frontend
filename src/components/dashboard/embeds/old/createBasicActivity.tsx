import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
	Button,
	Container,
	Flex,
	Heading,
	HStack,
	IconButton,
	Text,
	VStack,
} from "@chakra-ui/react";
import CFormikInput from "@components/dashboard/embeds/formikinput";
import CNumberInput from "@components/formiknumberinput";
// import { createProgram } from "@api/program";
import GlassBgBox from "@components/glassbg";
import CFormikUnitSelect from "@components/unitselectoptions";
import { Field, FieldArray, Form, Formik } from "formik";
import { BiNote } from "react-icons/bi";
import * as Yup from "yup";
export default function CreateForm() {
	const ProgramSchema = Yup.object().shape({
		lifts: Yup.array().of(
			Yup.object().shape({
				name: Yup.string()
					.min(2, "too short")
					.required("Required")
					.max(25, "Too long!"),
				load: Yup.number()
					.positive("Provide a positive load!")
					.max(9000, "It can't be over 9000!!"),
				sets: Yup.number()
					.required()
					.positive("Use a positive number")
					.max(999, "Thats too much.."),
				reps: Yup.number()
					.required()
					.positive("Use a positive number")
					.max(999, "Thats too much.."),
				rest: Yup.string().max(50, "Too long!"),
				note: Yup.string()
					.min(3, "Too short! How is that a note?")
					.max(100, "Too long!"),
				unit: Yup.string().max(15),
				hideNote: Yup.boolean(),
			})
		),
	});

	interface MyFormValues {
		lifts: [
			{
				name: string;
				load: string;
				sets: string;
				reps: string;
				rest: string;
				note: string;
				hideNote: boolean;
				unit: string;
			}
		];
	}
	const initialValues: MyFormValues = {
		lifts: [
			{
				name: "",
				load: "135",
				sets: "5",
				reps: "5",
				rest: "",
				note: "",
				hideNote: true,
				unit: "lb",
			},
		],
	};
	return (
		<Container>
			<Heading as="h3" size="lg" mb={4} opacity="0.7">
				Basic Program
			</Heading>
			<GlassBgBox p="18px" op={0.08}>
				<Formik
					initialValues={initialValues}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							actions.setSubmitting(false);
						}, 1000);
					}}
					validationSchema={ProgramSchema}
					// validateOnChange={false}
					// validateOnBlur={false}
				>
					{({ values, setFieldValue, isSubmitting }) => (
						<Form>
							<FieldArray name="lifts">
								{({ remove, push }) => (
									<div>
										<Flex justify="flex-end" w="100%">
											<IconButton
												aria-label="add"
												icon={<AddIcon />}
												type="button"
												onClick={() =>
													push({
														note: "",
														name: "",
														load: "",
														set: "",
														reps: "",
														rest: "",
														hideNote: true,
														unit: "lb",
													})
												}
											>
												Add activity
											</IconButton>
										</Flex>
										{values.lifts.length > 0 &&
											values.lifts.map((lift, index) => {
												return (
													<VStack
														key={index}
														mb="32px"
														spacing="16px"
														w="100%"
													>
														<Flex
															justify="flex-end"
															align="center"
															w="100%"
														>
															<IconButton
																variant="ghost"
																aria-label="add note"
																icon={
																	<BiNote />
																}
																type="button"
																onClick={() =>
																	setFieldValue(
																		`lifts[${index}].hideNote`,
																		!lift.hideNote
																	)
																}
															/>
															<IconButton
																variant="ghost"
																aria-label="delete"
																icon={
																	<DeleteIcon />
																}
																type="button"
																onClick={() =>
																	remove(
																		index
																	)
																}
															/>
														</Flex>
														<Field
															name={`lifts.${index}.name`}
															component={
																CFormikInput
															}
														/>

														<HStack
															spacing="10px"
															align="center"
														>
															<Field
																name={`lifts.${index}.sets`}
																component={
																	CNumberInput
																}
															/>

															<Text>x</Text>
															<Field
																name={`lifts.${index}.reps`}
																component={
																	CNumberInput
																}
															/>
														</HStack>
														<HStack
															spacing="10px"
															w="100%"
														>
															<Field
																name={`lifts.${index}.load`}
																component={
																	CNumberInput
																}
															/>
															<Text>@</Text>
															<Field
																name={`lifts[${index}].unit`}
																component={
																	CFormikUnitSelect
																}
															/>
														</HStack>
														{lift.hideNote ? null : (
															<Field
																name={`lifts.${index}.note`}
																component={
																	CFormikInput
																}
															/>
														)}
													</VStack>
												);
											})}
										<IconButton
											aria-label="add"
											icon={<AddIcon />}
											type="submit"
											onClick={() =>
												push({
													note: "",
													name: "",
													load: "",
													sets: "5",
													reps: "5",
													rest: "",
													hideNote: true,
													unit: "lb",
												})
											}
										>
											Add activity
										</IconButton>
									</div>
								)}
							</FieldArray>
							{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

							{/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
							<Button
								type="submit"
								variant="outline"
								my="16px"
								isLoading={isSubmitting}
							>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</GlassBgBox>
		</Container>
	);
}
