import prisma from "@/prisma/client";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body);
    
    try {
      await prisma.user.createMany({
        data: req.body.map((user: any) => ({
          email: user.email,
          password: user.password,
          name: user.name,
          surname: user.surname,
          class: user.class,
        })),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
    res.status(200).json({ message: "Success" });
  }
}
