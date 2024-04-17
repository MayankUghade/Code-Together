import { auth } from "@/utils/auth";
import EditRoomForm from "./EditRoomForm";
import { roomInfo } from "@/app/data-access/fetchData";
export default async function Page(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  console.log(roomId);

  const roomData = await roomInfo(roomId);

  if (!roomData) {
    return <div>Room not found</div>;
  }

  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <EditRoomForm room={roomData} />
    </div>
  );
}
