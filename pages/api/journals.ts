import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.id) {
      try {
        const journals = await prisma.journal.findMany();
        res.status(200).json(journals);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
      }
    }
    if (req.query.id) {
      try {
        const journals = await prisma.journal.findMany({
          where: {
            authorId: req.query.id.toString(),
          },
        });
        res.status(200).json(journals);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
      }
    }
  }

  if (req.method === "POST") {
    console.log(req.body);

    try {
      await prisma.journal.create({
        data: {
          allHours: req.body.allHours,
          authorId: req.body.authorId,
        },
      });

      const [res]: any =
        await prisma.$queryRaw`SELECT id FROM "Journal" WHERE "authorId" = ${req.body.authorId}`;

      console.log(res);

      await prisma.element.createMany({
        data: req.body.elements.map((element: any) => ({
          journalId: res.id,
          description: element.description,
          hours: element.hours,
        })),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
    res.status(200).json({ message: "Success" });
  }
}
