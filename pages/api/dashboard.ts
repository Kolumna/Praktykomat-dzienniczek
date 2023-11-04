import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.query.id) {
      const count = await prisma.journal.count({
        where: {
          authorId: req.query.id.toString(),
        },
      });

      res.status(200).json({ count });
    }
  }
}
