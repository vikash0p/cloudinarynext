import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
    const body = await req.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

    return Response.json({ signature });
}