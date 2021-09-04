import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader(
		'Set-Cookie',
		cookie.serialize(req.body.key, req.body.value, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			maxAge: req.body.expire,
			sameSite: 'strict',
			path: '/',
		})
	);
	res.status(200).json({ success: true });
};
