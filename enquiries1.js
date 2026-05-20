export default async function handler(request, response) {
  setCorsHeaders(request, response);

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = request.body;
    validatePayload(payload);
    await storeInSupabase(payload);
    return response.status(200).json({ ok: true });
  } catch (error) {
    return response.status(400).json({ error: error.message || "Unable to submit enquiry" });
  }
}

function setCorsHeaders(request, response) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || request.headers.origin || "*";
  response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Vary", "Origin");
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid enquiry payload.");
  }

  if (!["institute", "college", "corporate"].includes(payload.enquiryType)) {
    throw new Error("Invalid enquiry type.");
  }

  if (!payload.data || typeof payload.data !== "object") {
    throw new Error("Missing enquiry data.");
  }
}

async function storeInSupabase(payload) {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Database is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  const result = await fetch(`${url.replace(/\/$/, "")}/rest/v1/enquiries`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      enquiry_type: payload.enquiryType,
      source_url: payload.source,
      submitted_at: payload.submittedAt,
      payload: payload.data
    })
  });

  if (!result.ok) {
    throw new Error("Database submission failed.");
  }
}
