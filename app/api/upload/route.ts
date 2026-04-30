export async function POST(req: Request) {
  try {
    console.log("UPLOAD HIT");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ ok: false, error: "no file" });
    }

    return Response.json({
      ok: true,
      received: true,
      type: typeof file
    });

  } catch (e) {
    return Response.json({
      ok: false,
      error: String(e)
    });
  }
}
