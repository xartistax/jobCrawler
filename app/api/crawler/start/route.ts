import { fastAPI } from "@/config/constants";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json({ error: "Missing token" }, { status: 401 });
    }

    const idToken = authHeader.slice("Bearer ".length);
    const decoded = await adminAuth.verifyIdToken(idToken);

    const body = await req.json();
    const uidDecoded = decoded.uid;
    const { uid, startedAt } = body;

    if (uid !== uidDecoded) {
      return console.log("someting went wrong");
    }

    const res = await fetch(`${fastAPI}/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ uid, startedAt }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return Response.json({ error: "Crawler API failed", details: data }, { status: res.status });
    }

    return Response.json({ data });
  } catch (err: any) {
    return Response.json({ error: err?.message ?? "Internal error" }, { status: 500 });
  }
}
