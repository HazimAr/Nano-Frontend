// import React, { FunctionComponent } from "react";
import {
	AddIcon,
	CloseIcon,
	DownloadIcon,
	ViewIcon,
	ViewOffIcon,
} from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	FormLabel,
	HStack,
	IconButton,
	SimpleGrid,
} from "@chakra-ui/react";
import CFormikInput from "@components/dashboard/embeds/formikinput";
import Lifts from "@components/dashboard/embeds/old/formsections/liftsection";
import CFormikTextarea from "@components/formiktextarea";
import { Field, FieldArray } from "formik";
import { useState } from "react";
import { BiNote } from "react-icons/bi";
export default function Workouts({
	workoutsArrayHelpers,
	dayIndex,
	daysArrayHelpers,
	formHelpers,
}: any) {
	const { values } = workoutsArrayHelpers.form;
	interface Lifts {
		name: string;
		load: string;
		sets: string;
		reps: string;
		rest: string;
		note: string;
		hideNote: boolean;
		unit: string;
	}
	interface Workouts {
		workoutName: string;
		workoutNote: string;
		hideNote: boolean;
		rest: string;
		type: string;
		lifts: Lifts[];
	}
	const [display, setDisplay] = useState(true);
	return (
		<Box>
			<Flex justify="space-between" mt="20px">
				<Flex>
					<Field
						name={`days[${dayIndex}].dayName`}
						component={CFormikInput}
					/>
				</Flex>
				<Flex align="center">
					<HStack
						justify="flex-end"
						spacing={1}
						// border="1px solid teal"
						// p="6px"
						// borderRadius="5px"
					>
						<AddIcon />
						<Button
							variant="outline"
							onClick={() => {
								workoutsArrayHelpers.push({
									workoutName: "",
									workoutNote: "",
									rest: "",
									type: "single",
									lifts: [
										{
											name: `New Lift`,
											load: "",
											sets: "",
											reps: "",
											rest: "",
											note: "",
											hideNote: true,
											unit: "lb",
										},
									],
								});
							}}
						>
							Lift
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								workoutsArrayHelpers.push({
									workoutName: "Super Set",
									workoutNote: "",
									hideNote: true,
									rest: "",
									type: "superset",
									lifts: [
										{
											name: "Lift 1",
											load: "",
											sets: "",
											reps: "",
											rest: "",
											note: "",
											hideNote: true,
											unit: "lb",
										},
										{
											name: "Lift 2",
											load: "",
											sets: "",
											reps: "",
											rest: "",
											note: "",
											hideNote: true,
											unit: "lb",
										},
									],
								});
							}}
						>
							SuperSet
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								workoutsArrayHelpers.push({
									workoutName: "Circuit",
									workoutNote: "",
									hideNote: true,
									rest: "",
									type: "circuit",
									lifts: [
										{
											name: "Lift 1",
											load: "",
											sets: "",
											reps: "",
											rest: "",
											note: "",
											hideNote: true,
											unit: "lb",
										},
										{
											name: "Lift 2",
											load: "",
											sets: "",
											reps: "",
											rest: "",
											note: "",
											hideNote: true,
											unit: "lb",
										},
										{
											name: "Lift 3",
											load: "",
											sets: "",
											reps: "",
											rest: "",
											note: "",
											hideNote: true,
											unit: "lb",
										},
									],
								});
							}}
						>
							Circuit
						</Button>
					</HStack>
					<IconButton
						variant="ghost"
						aria-label="hide day"
						icon={display ? <ViewIcon /> : <ViewOffIcon />}
						// type="button"
						onClick={() => setDisplay(!display)}
					/>
					<IconButton
						variant="ghost"
						aria-label="add note"
						icon={<BiNote />}
						type="button"
						onClick={() =>
							formHelpers.setFieldValue(
								`days[${dayIndex}].hideNote`,
								!values.days[dayIndex].hideNote
							)
						}
					/>

					<IconButton
						aria-label="download day template"
						// onClick={() => daysArrayHelpers.remove(index)}
						icon={<DownloadIcon />}
						variant="ghost"
					/>
					<IconButton
						aria-label="delete"
						onClick={() => daysArrayHelpers.remove(dayIndex)}
						icon={<CloseIcon />}
						variant="ghost"
					/>
				</Flex>
			</Flex>

			{values.days[dayIndex].hideNote ? null : (
				<Box mt="10px">
					<FormLabel fontSize="15px">Description:</FormLabel>
					<Field
						name={`days[${dayIndex}].dayDescription`}
						component={CFormikTextarea}
					/>
				</Box>
			)}
			{display ? (
				<Box>
					{values.days[dayIndex].workouts.length < 1 ? null : (
						<Box m="8px" px="12px" py="8px">
							<SimpleGrid columns={6}>
								<Box>Movement</Box>
								<Box>Sets</Box>
								<Box>Reps</Box>
								<Box>Load</Box>
								<Box>Unit</Box>
								<Box></Box>
							</SimpleGrid>
						</Box>
					)}
					{values.days[dayIndex].workouts &&
					values.days[dayIndex].workouts.length > 0
						? values.days[dayIndex].workouts.map(
								(workout: Workouts, index: any) => (
									// {console.log(workout)}

									<FieldArray
										key={index}
										name={`days[${dayIndex}].workouts[${index}].lifts`}
										render={(arrayHelpers) => (
											<>
												<Lifts
													workoutIndex={index}
													dayIndex={dayIndex}
													liftsArrayHelpers={
														arrayHelpers
													}
													workoutsArrayHelpers={
														workoutsArrayHelpers
													}
												/>
											</>
										)}
									/>
								)
						  )
						: null}
				</Box>
			) : null}
		</Box>
	);
}
