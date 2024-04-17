"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { revalidatePath } from "next/cache";

export async function getYouRoomData() {
  const session = await auth();
  const currentUserId = session?.user?.id;
  return await prisma.room.findMany({
    where: {
      userId: currentUserId,
    },
  });
}

export async function deleteRoom(roomId: string) {
  await prisma.room.delete({
    where: {
      id: roomId,
    },
  });
  revalidatePath("/your-rooms");
}
