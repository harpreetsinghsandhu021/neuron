"use server";

import prisma from "@repo/db/client";
import { productType } from "./types";

export async function createProduct(values: productType, id: number) {
  try {
    await prisma.product.create({
      data: {
        name: values.name,
        price: values.price,
        image: values.image,
        domainId: id,
      },
    });

    return { status: 201 };
  } catch (err: any) {
    return { erorr: err, status: err.status || 500 };
  }
}

export async function deleteProduct(ids: number[]) {
  try {
    const res = await prisma.product.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    if (res.count === ids.length) {
      return { status: 204 };
    }
  } catch (err: any) {
    console.log(err);

    return { erorr: err, status: err.status || 500 };
  }
}
