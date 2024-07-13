// api/subscribe.js

export async function POST({ request }) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        message: "Only post requests are allowed!",
      }),
      { status: 405 }
    );
  }
  const data = await request.json();

  const email = data.email;

  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email: email,
      reactivate_existing: false,
      send_welcome_email: false,
      utm_medium: "organic",
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return new Response(
      JSON.stringify({
        message: "Success!",
        data: data,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error!",
      }),
      { status: 500 }
    );
  }
}
