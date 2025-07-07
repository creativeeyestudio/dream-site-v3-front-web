export default async function connectToPayloadCMS(): Promise<string> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.NEXT_PUBLIC_API_USER,
        password: process.env.API_PASSWORD,
      }),
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "—");
    throw new Error(`Login Payload (${res.status})\n${detail}`);
  }

  const { token } = await res.json();
  return token as string;
}
