"use server";

import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { DomainType } from "./types";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import prisma from "@repo/db/client";

export async function createDomain(values: DomainType) {
  try {
    const user = await currentUser();

    const userFromDb = await prisma.user.findFirst({
      where: {
        clerkId: user!.id as string,
      },
      select: {
        id: true,
        fullName: true,
      },
    });

    console.log(userFromDb);

    const res = await prisma.domain.create({
      data: {
        name: values.name,
        icon: values.icon,
        slug: values.name.replaceAll(".", "-"),
        userId: userFromDb?.id as number,
      },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    console.log(res);

    if (res) {
      await prisma.chatbot.create({
        data: {
          domainId: res.id,
        },
      });

      return { domain: res, status: 201 };
    }
  } catch (err: any) {
    console.log(err);

    return { erorr: err, status: err.status || 500 };
  }
}

export async function getAllDomains() {
  try {
    const domains = await prisma.domain.findMany({
      select: {
        name: true,
        icon: true,
        slug: true,
      },
    });

    if (domains) {
      return { domains, status: 200 };
    }
  } catch (err: any | object) {
    if (err.name === "PrismaClientInitializationError") {
      return {
        erorr: "Unable to initialize prisma",
        status: err.errorCode || 500,
      };
    }

    return { erorr: err, status: err.status || 500 };
  }
}

export async function getParticularDomainData(slug: string) {
  try {
    const domain = await prisma.domain.findFirst({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const chatbot = await prisma.chatbot.findFirst({
      where: {
        domainId: domain?.id,
      },
      select: {
        id: true,
        welcomeMessage: true,
        icon: true,
        background: true,
        textColor: true,
        helpDesk: true,
        domainId: true,
      },
    });

    const helpDesk = await prisma.helpDesk.findMany({
      where: {
        domainId: domain?.id,
      },
      select: {
        question: true,
        answer: true,
      },
    });

    const filteredQuestions = await prisma.filterQuestions.findMany({
      where: {
        domainId: domain?.id,
      },
      select: {
        question: true,
        answer: true,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        domainId: domain?.id,
      },
    });

    return {
      chatbot,
      domain,
      helpDesk,
      filteredQuestions,
      products,
      status: 200,
    };
  } catch (err: any) {
    return { erorr: err, status: err.status || 500 };
  }
}
