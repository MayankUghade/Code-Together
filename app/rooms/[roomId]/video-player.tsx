"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useSession } from "next-auth/react";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { genrateVideoToken } from "./actions";

// Instead of accessing process.env directly, provide apiKey and token as props or use Next.js environment variables
const apiKey = "ypraahkgvgz4";

export function CodeTogetherVideo({ roomId }: { roomId: string }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!session) {
      return;
    }

    const client = new StreamVideoClient({
      apiKey,
      user: { id: userId || "" },
      tokenProvider: () => genrateVideoToken(),
    });

    const call = client.call("default", roomId);
    call.join({ create: true });

    setClient(client);
    setCall(call);

    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [roomId, session]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}
