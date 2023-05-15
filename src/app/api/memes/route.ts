import { NextResponse } from "next/server";
import database from "@/data/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    database.unshift({
      id: Math.random().toString(),
      ...body,
    });

    return NextResponse.json(database, {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}
