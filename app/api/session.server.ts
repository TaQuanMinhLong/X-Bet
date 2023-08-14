import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { z } from "zod";
import { objectKeys } from "~/lib/utils";

export const SESSION_KEY = "x-bet-session";

export const EMPTY_SESSION = { "Set-Cookie": "x-bet-session= ;HttpOnly" };

const { SESSION_SECRET, API_URL } = process.env;

const storage = createCookieSessionStorage({
  cookie: {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 30,
  },
});

export const session_schema = z.object({
  playerId: z.string().trim().nonempty(),
  roomId: z.string().trim().nonempty(),
});

export type GameSession = z.infer<typeof session_schema>;

export const getSessionStorage = async (request: Request) =>
  storage.getSession(request.headers.get("Cookie"));

export async function createPlayerSession(playerId: string, roomId: string) {
  const session = await storage.getSession();
  session.set(SESSION_KEY, { playerId, roomId });
  return redirect("/start", { headers: { "Set-Cookie": await storage.commitSession(session) } });
}

export async function destroyPlayerSession() {
  const session = await storage.getSession();
  return redirect("/", { headers: { "Set-Cookie": await storage.destroySession(session) } });
}

export async function requireGameSession(request: Request) {
  try {
    const session = await getSessionStorage(request);
    return session_schema.parse(await session.get(SESSION_KEY));
  } catch (error) {
    console.error("Invalid session data", error);
    throw redirect("/");
  }
}

export async function validateSession(request: Request) {
  const session = await requireGameSession(request);
  const body = new FormData();
  objectKeys(session).forEach((key) => body.append(key, session[key]));
  try {
    const res = await fetch(`${API_URL}/connect`, { method: "POST", body });
    const data = (await res.json()) as { isValid: boolean };
    if (data.isValid) return session;
    else return destroyPlayerSession();
  } catch (error) {
    console.error(error);
    return json({ error: "Error while validating game session" }, { status: 500 });
  }
}
