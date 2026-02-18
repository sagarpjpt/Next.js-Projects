import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import Post from '@/models/Post'

export const GET = async (request) => {
  // fetch all posts from database
  try {
    await connectDB();

    const posts = await Post.find();
    
    return NextResponse.json(posts, {
        status: 200
    })
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
};
