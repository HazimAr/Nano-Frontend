// Put Types and interfaces here
export type DiscordUser = {
	user: {
		name: string;
		id: number;
		image: string;
	};

	expires: string;
	accessToken: string;
};

export type Lifts = {
	name: string;
	load: string;
	sets: string;
	reps: string;
	rest: string;
	note: string;
	hideNote: boolean;
	unit: string;
};
export type Workouts = {
	workoutName: string;
	workoutNote: string;
	hideNote: boolean;
	type: string;
	rest: string;
	lifts: Lifts[];
};
export type Days = {
	dayName: string;
	dayDescription: string;
	hideNote: boolean;
	workouts: Workouts[];
};
export type MyFormValues = {
	title: string;
	description: string;
	// preset: string | null;
	days: Days[];
};
