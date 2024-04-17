import { roomInfo } from "@/app/data-access/fetchData";
import TagsList from "@/components/TagsList";
import { SplitTags } from "@/utils/splitTags";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CodeTogetherVideo } from "./video-player";
import { auth } from "@/utils/auth";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await roomInfo(roomId);

  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  if (!room) {
    return (
      <div>
        <h1>Room not found</h1>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 min-h-screen p-5">
      <div className="col-span-3 p-4 pr-2">
        <div className="p-4 border-2 col-span-2 rounded-sm">
          <CodeTogetherVideo roomId={roomId} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        {" "}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base font-semibold">{room?.name}</h1>

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-center text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon className="w-[25px] h-[25px]" />
              Github Project
            </Link>
          )}

          <p className="text-base text-gray-600">{room?.description}</p>

          <TagsList tags={SplitTags(room?.tags)} />
        </div>
      </div>
    </div>
  );
}
