import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { fetchRoomData } from "@/app/data-access/fetchData";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import TagsList from "./TagsList";
import { SplitTags } from "@/utils/splitTags";
import SearchBar from "./SearchBar";

export default async function MainContent({
  searchItem,
}: {
  searchItem: string;
}) {
  const roomData = await fetchRoomData(searchItem);

  return (
    <div className="flex flex-col gap-5 md:py-12 md:p-5 p-3 md:mx-10">
      <div className="w-full flex items-center justify-center">
        <Link href="/your-rooms">
          <Button variant="outline">Your rooms</Button>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-3 mx-5">
        <h1 className="sm:text-3xl text-lg font-bold">Explore Rooms</h1>
        <Button>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <h1 className="dark:text-gray-500 text-gray-400 text-center sm:text-lg text-sm">
        Discover numerous developer rooms established by various developers
        here. Join any of these rooms to commence learning and collaborating.
      </h1>

      <SearchBar />

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
              <CardFooter>
                <Button asChild>
                  <Link href={`/rooms/${item.id}`}>Join Room</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
