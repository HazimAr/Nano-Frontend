import { createTimer } from '@api/server';
import {
	Box,
	Heading,
	HStack,
	Stack,
	Text,
	Button,
	Divider,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Channels } from '@components/guild/channels';
import { useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import Layout from '@components/guild/layout';
//
//
const handleToast = (status, description, toast) => {
	toast({
		title: status,
		description,
		//
		status: status.toLowerCase(),
		duration: 2_000,
		isClosable: true,
	});
};
//
export function SELECT_FIVE({ session, api_response, cookies }: { session: DiscordUser; api_response: any; cookies: any }): JSX.Element {
	const { guild_id } = cookies ?? {};
	const { guild, categories } = api_response ?? {};

	const arr = [];
	let timer_len = 0;

	for (let i = 1; i < 6; i++) {
		if (guild?.timers?.[i]?.message) {
			guild.timers[i].timer_id = i;
			arr.push(guild.timers[i]);
			timer_len++;
		} else arr.push({ not_set: true, timer_id: i });
	}

	const [timerArr, setTimerArr] = useState(arr);

	const updateTimer = ({ enabled, message, channel_id, interval, channel, timer_id }, _delete) => {
		if (_delete === true) {
			setTimerArr(
				timerArr.map((timer, i) => {
					if (i + 1 === Number.parseInt(timer_id)) return { not_set: true, timer_id };
					else return timer;
				})
			);
		} else {
			setTimerArr(
				timerArr.map((timer, i) => {
					if (i + 1 === Number.parseInt(timer_id)) return { enabled, message, channel_id, interval, channel, timer_id };
					else return timer;
				})
			);
		}
	};

	return (
		<Layout session={session} cookies={cookies}>
			<Stack h="100%" w="100%" maxW="1200px" mt="50px" px="100px">
				<HStack justify="space-between">
					<Heading>Timers</Heading>
					<Text>
						{timer_len}/{guild.premium === 0 ? 1 : 5}
					</Text>
				</HStack>
				<Text>Timers sent every x minutes in a Discord channel.</Text>

				<VStack py="25px" spacing={50}>
					{timerArr.map((timer) => (
						<Timer key={timer.timer_id} timer={timer} guild_id={guild_id} token={session.accessToken} categories={categories} updateTimer={updateTimer} />
					))}
				</VStack>
			</Stack>
		</Layout>
	);
}
//
//
//
function Timer(props: { guild_id: string; token: unknown; timer: any; categories: any; updateTimer: any }): JSX.Element {
	return (
		<Box pos="relative" h="100%" minH="50px" w="100%" bg="rgba(11,51,15,0.8)" rounded={5} backgroundColor="red_black.gray">
			<EditTimer {...props} />
			<DeleteTimer {...props} />
		</Box>
	);
}
//
//
//
function EditTimer({ token, categories, guild_id, timer, updateTimer }: { token: unknown; categories: any; guild_id: string; timer: any; updateTimer: any }): JSX.Element {
	const { timer_id, channel_id, interval: _interval } = timer ?? {};

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [channel, setChannel] = useState({ channel_id });
	const [interval, setInterval] = useState(_interval?.toString());
	const [message, setMessage] = useState(timer?.message ?? '');
	const toast = useToast();

	return (
		<>
			<Button h="100%" w="100%" py="15px" bg="red_black.black" onClick={onOpen} _hover={{ transform: 'scale(1.2)' }} _focus={{ transform: 'scale(1.2)' }}>
				{timer.channel?.name || timer.channel?.channel_name ? (
					<VStack>
						<HStack>
							<Heading size="md" color="red_black.red">
								{timer.channel.name ?? timer.channel?.channel_name}
							</Heading>
							<Text size="md" color="light_white">
								{interval && `every ${(interval / 60_000).toFixed(0)}'`}
							</Text>
						</HStack>
						<Text size="md" color="white">
							{timer.message}
						</Text>
					</VStack>
				) : (
					<Heading size="md" color="osu">
						Set Timer {timer_id}
					</Heading>
				)}
			</Button>
			{/* // --------------------------                    -------------------------- */}
			{/* // -------------------------- 🔽 POP-UP MENU 🔽 -------------------------- */}
			{/* // --------------------------                    -------------------------- */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="red_black.black">
					<ModalHeader>Add Timer</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Channels categories={categories} channel={channel} setChannel={setChannel} />
						<Divider my={5} />
						<Stack>
							<Heading size="md" textAlign="center">
								Interval
							</Heading>
							<InputGroup>
								<InputLeftAddon bg="rgba(0,0,0,0.2)">Every</InputLeftAddon>
								<Input type="number" value={(interval / 1_000 / 60).toString()} onChange={(e: any) => setInterval(e.target.value * 1_000 * 60)} />
								<InputRightAddon bg="rgba(0,0,0,0.2)">minutes</InputRightAddon>
							</InputGroup>
						</Stack>
						<Divider my={5} />
						<Stack>
							<Heading size="md" textAlign="center">
								Message
							</Heading>
							<Textarea onChange={(e) => setMessage(e.target.value)} value={message} />
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose} bg="red_black.red">
							Cancel
						</Button>
						<Button
							bg="red_black.red"
							onClick={async () => {
								if (!channel?.channel_id || !message || !timer) return handleToast('Error', 'Please fill out all fields.', toast);
								else if (interval < 60_000) return handleToast('Error', 'Please provide a number greater than 1 minute', toast);

								onClose();
								const { data } = await createTimer(guild_id, channel.channel_id, interval, timer_id, message, token, false, true);
								updateTimer({ enabled: true, message, channel_id: channel.channel_id, interval, channel, timer_id }, false);
								return handleToast('Success', data, toast);
							}}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
//
//
//
function DeleteTimer({ token, categories, timer, guild_id, updateTimer }: { token: unknown; categories: any; timer: any; guild_id: string; updateTimer: any }): JSX.Element {
	const { timer_id, channel_id, interval: _interval } = timer ?? {};
	const toast = useToast();

	return timer.enabled ? (
		<Button
			bg="transparent"
			position="absolute"
			right="-25px"
			top="-10px"
			fontSize="30px"
			_hover={{ transform: 'scale(1.15)' }}
			_focus={{ transform: 'scale(1.15)' }}
			onClick={async () => {
				const { data } = await createTimer(guild_id, null, null, timer_id, null, token, true, true);
				updateTimer({ timer_id }, true);
				handleToast('Success', data, toast);
			}}
		>
			<FcCancel />
		</Button>
	) : null;
}
