"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { revalidatePath } from "next/cache";

interface roomTypes {
  name: string;
  description: string;
  githubRepo: string;
  tags: string;
}

export async function createRoomAction(roomData: roomTypes) {
  const session = await auth();

  const userId = session?.user?.id as string;

  await prisma.room.create({ data: { userId, ...roomData } });

  revalidatePath("/");
}
