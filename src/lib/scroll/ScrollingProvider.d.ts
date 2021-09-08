import { ReactNode } from "react";
declare type Props = {
	debounceDelay?: number;
	scrollBehavior?: "auto" | "smooth";
	offset?: number;
	children: ReactNode;
};
declare const ScrollingProvider: ({
	debounceDelay,
	scrollBehavior,
	offset,
	children,
}: Props) => JSX.Element;
export default ScrollingProvider;
