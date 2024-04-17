import prisma from "@/utils/connect";
import { unstable_noStore } from "next/cache";

export async function fetchRoomData(searchItem: string | undefined) {
  unstable_noStore();

  let roomData = await prisma.room.findMany({});

  if (searchItem && searchItem.trim() !== "") {
    roomData = roomData.filter((item: any) => item.tags.includes(searchItem));
  }

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
