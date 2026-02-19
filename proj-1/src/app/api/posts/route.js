import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import Post from '@/models/Post'

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  try {
    await connectDB();

    if(!username) {
      const posts = await Post.find();
      return NextResponse.json(posts, {
        status: 200
      })
    }
    
    const posts = await Post.find({ username });
    return NextResponse.json(posts, {
        status: 200
    })
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
};

export const POST = async (request) => {
  const {title, description, img, content, username} = await request.json();
  try {
    await connectDB();
    const newPost = new Post({
      title,
      description,
      img,
      content,
      username
    });
    await newPost.save();
    return NextResponse.json(newPost, {
      status: 201
    })
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}