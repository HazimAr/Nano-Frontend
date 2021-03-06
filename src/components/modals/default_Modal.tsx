import { useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { ModalSectionChannel } from './sections/modal_section_channel';
import { ModalSectionEmbed } from './sections/modal_section_embed';
import { ModalSectionMessage } from './sections/modal_section_message';

export function DefaultModal(): JSX.Element {
	const [emoji, setEmoji] = useState('');
	const [role, setRole] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const [channel, setChannel] = useState('');
	const [embed, setEmbed] = useState('');
	const [message, setMessage] = useState('');

	const template = {
		embed: Object,
		message: String,
		channelID: String,
	};

	return (
		<VStack>
			<ModalSectionChannel />
			<ModalSectionEmbed />
			<ModalSectionMessage />
		</VStack>
	);
}
