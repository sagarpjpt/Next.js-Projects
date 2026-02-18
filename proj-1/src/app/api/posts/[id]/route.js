import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
  // fetch a particular post from database
  const { id } = await params;
  try {
    await connectDB();

    const post = await Post.findById(id);

    return NextResponse.json(post, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
