import { fastAPI } from "@/config/constants";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  const startedAt = searchParams.get("startedAt");

  if (!uid || !startedAt) {
    return Response.json(
      { error: "uid and startedAt required" },
      { status: 400 },
    );
  }

  const upstream = await fetch(
    `${fastAPI}/logs/stream?uid=${encodeURIComponent(uid)}&startedAt=${encodeURIComponent(startedAt)}`,
    {
      headers: { Accept: "text/event-stream" },
      cache: "no-store",
    },
  );

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
