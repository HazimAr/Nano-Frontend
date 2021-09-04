import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader(
		'Set-Cookie',
		cookie.serialize(req.body.key, '', {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			expires: new Date(0),
			sameSite: 'strict',
			path: '/',
		})
	);
	res.status(200).json({ success: true });
};
