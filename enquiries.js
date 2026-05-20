exports.handler = async (event) => {
  const headers = corsHeaders(event);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" }, headers);
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    validatePayload(payload);
    await storeInSupabase(payload);
    return json(200, { ok: true }, headers);
  } catch (error) {
    return json(400, { error: error.message || "Unable to submit enquiry" }, headers);
  }
};

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

function corsHeaders(event) {
  return {
    "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || event.headers.origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    Vary: "Origin"
  };
}

function json(statusCode, body, headers) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
}
