import prisma from "@/prisma/client";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.query.id) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: req.query.id.toString(),
          },
        });
        res.status(200).json(user);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
      }
    }
  }
  if (req.method === "POST") {
    try {
      await prisma.user.create({
        data: {
          id: req.body.id,
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          surname: req.body.surname,
          class: req.body.class,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
    res.status(200).json({ message: "Success" });
  }
}
