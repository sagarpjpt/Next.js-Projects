import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/models/User";

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
