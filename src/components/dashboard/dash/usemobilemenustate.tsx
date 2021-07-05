/* eslint-disable @typescript-eslint/ban-types */
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import React from "react";

export const useMobileMenuState = (): Object => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const isMobile = useBreakpointValue({ base: true, lg: false });

	React.useEffect(() => {
		if (!isMobile) {
			onClose();
		}
	}, [isMobile, onClose]);

	return { isOpen, onClose, onOpen };
};
