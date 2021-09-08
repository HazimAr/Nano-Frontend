import React from "react";
declare type Props = {
	id: string;
	meta?: unknown;
	children: React.ReactNode;
} & React.HTMLProps<HTMLButtonElement>;
declare const Section: ({ id, children, meta, ...rest }: Props) => JSX.Element;
export default Section;
