"use server";

import { auth } from "@/utils/auth";
import { StreamChat } from "stream-chat";

export async function genrateVideoToken() {
  const session = await auth();

  const api_key = process.env.STREAM_API_KEY!;
  const api_secret = process.env.STREAM_API_SECRET_TOKEN!;
  const user_id = session?.user?.id!;

  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(user_id);
  return token;
}
