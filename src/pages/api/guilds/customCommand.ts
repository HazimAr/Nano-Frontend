import { createCustomCommand } from '@api/server';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/ano-default-export
export default async function CustomCommand(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> {
	if (req.method === 'PUT') {
		const {
			body: { guild_id, trigger, command_id, response, token, _delete },
		} = req;

		const API_response = await createCustomCommand(guild_id, trigger, command_id, response, token, _delete);

		res.status(200).json(API_response);
		return res;
	}
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;
	res.status(100).json({ detail: 'Method Not Allowed' });
	res.redirect(100, '/#');
	return res;
}
