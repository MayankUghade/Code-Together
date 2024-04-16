import prisma from "@/utils/connect";
import { unstable_noStore } from "next/cache";

export async function fetchRoomData() {
  unstable_noStore();
  const roomData = await prisma.room.findMany();
  return roomData;
}

export async function roomInfo(roomId: string) {
  unstable_noStore();
  return prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
}
