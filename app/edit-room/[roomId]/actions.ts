"use server";

import { roomInfo } from "@/app/data-access/fetchData";
import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface roomTypes {
  id: string;
  name: string;
  description: string;
  githubRepo: string;
  tags: string;
}

export async function editRoomAction(room: roomTypes, roomId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  const userId = session?.user?.id;

  const updatedRoom = await prisma.room.update({
    where: {
      id: roomId,
    },
    data: { userId, ...room },
  });

  return updatedRoom;

  revalidatePath("/your-rooms");
  revalidatePath(`/edit-room/${roomId}`);
  redirect("/your-rooms");
}
