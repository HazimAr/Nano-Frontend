import { createCustomCommand } from "@api/server";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/ano-default-export
export default async function CustomCommand(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<NextApiResponse> {
	if (req.method === "PUT") {
		const body = req.body;

		const response = await createCustomCommand(
			body.guild_id,
			body.trigger,
			body.command_id,
			body.response,
			body.token,
			body._delete
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
