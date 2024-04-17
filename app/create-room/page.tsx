import RoomForm from "@/app/create-room/room-form";
import { auth } from "@/utils/auth";
export default async function Page() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Create Room</h1>
      <RoomForm />
    </div>
  );
}
