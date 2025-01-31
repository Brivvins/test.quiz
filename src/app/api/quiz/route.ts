import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://api.jsonserve.com/Uw5CrX";

export async function GET() {
  try {
    const response = await axios.get(API_URL);
    return NextResponse.json(response.data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quiz data" }, { status: 500 });
  }
}
