export default async function connectToPayloadCMS() {
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: process.env.NEXT_PUBLIC_API_USER,
            password: process.env.API_PASSWORD,
        })
    }).then(async (req) => await req.json())

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        headers: {
            Authorization: `JWT ${user.token}`,
        }
    })

    if (!req.ok) throw new Error("Error during connect to Payload CMS");

    return req;
}