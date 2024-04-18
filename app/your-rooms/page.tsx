import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import TagsList from "@/components/TagsList";
import { SplitTags } from "@/utils/splitTags";
import { getYouRoomData } from "./actions";
import DeleteRoom from "./Delete";
import Image from "next/image";
import { auth } from "@/utils/auth";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const roomData = await getYouRoomData();
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return (
    <div className="flex flex-col gap-5 md:py-12 md:p-5 p-3 md:mx-10">
      <div className="flex justify-between p-5 items-center gap-3 mx-5">
        <h1 className="sm:text-3xl text-lg font-bold">Your rooms</h1>
        <Button>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {roomData.map((item) => {
          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <TagsList tags={SplitTags(item.tags)} />
                  {item.githubRepo && (
                    <Link
                      href={item.githubRepo}
                      className="flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubLogoIcon />
                      Github Project
                    </Link>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button asChild>
                  <Link href={`/rooms/${item.id}`}>Join Room</Link>
                </Button>

                <div className="flex items-center gap-3">
                  <DeleteRoom roomId={item.id} />
                  <Link href={`/edit-room/${item.id}`}>
                    <Pencil className="text-blue-500" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {roomData.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/noData.svg"
            width="300"
            height="300"
            alt="no data image"
          />

          <h2 className="text-2xl">No rooms created yet</h2>
        </div>
      )}
    </div>
  );
}
