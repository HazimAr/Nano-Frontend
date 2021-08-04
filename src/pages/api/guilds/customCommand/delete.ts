import { deleteGuildCommand } from "@api/server";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/ano-default-export
export default async function Timer(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<NextApiResponse> {
	if (req.method === "POST") {
		const body = req.body;
		const response = await deleteGuildCommand(
			body.guild_id,
			body.command_id,
			body.token
		);
		void res.status(200).json(response);
		return res;
	}

	res.setHeader("Content-Type", "application/json");
	res.statusCode = 200;
	res.status(100).json({ detail: "Method Not Allowed" });
	res.redirect(100, "/#");
	return res;
}
