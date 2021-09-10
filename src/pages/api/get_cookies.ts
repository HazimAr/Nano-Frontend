import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log(cookie.parse(req.headers.cookie || {}));
	res.status(200).json(cookie.parse(req.headers.cookie || {}));
};
