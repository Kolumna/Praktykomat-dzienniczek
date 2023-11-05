import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.query.id && !req.query.studentId) {
      try {
        const journals = await prisma.journal.findMany();
        res.status(200).json(journals);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
      }
    }
    if (req.query.studentId) {
      try {
        const journals = await prisma.journal.findMany({
          where: {
            authorId: req.query.studentId.toString(),
          },
          include: {
            elements: true,
          },
        });

        res.status(200).json(journals);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
      }
    }
    if (req.query.id) {
      try {
        const journals = await prisma.journal.findUnique({
          where: {
            id: req.query.id.toString(),
          },
          include: {
            elements: true,
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
      const journal = await prisma.journal.create({
        data: {
          allHours: req.body.allHours,
          authorId: req.body.authorId,
        },
      });

      await prisma.element.createMany({
        data: req.body.elements.map((element: any) => ({
          journalId: journal.id,
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

  if (req.method === "PUT") {
    console.log(req.body.id);

    try {
      const journal = await prisma.journal.update({
        where: {
          id: req.query.id?.toString(),
        },
        data: {
          allHours: req.body.allHours,
        },
      });

      await prisma.element.deleteMany({
        where: {
          journalId: req.body.id,
        },
      });

      await prisma.element.createMany({
        data: req.body.elements.map((element: any) => ({
          journalId: journal.id,
          description: element.description,
          hours: element.hours,
        })),
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "error", error });
    }
    res.status(200).json({ message: "Success" });
  }
}
