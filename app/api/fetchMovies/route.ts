import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { message: "Query parameter is required" },
      { status: 400 },
    );
  }

  if (!TMDB_API_KEY) {
    console.error("TMDB API Key is missing!");
    return NextResponse.json(
      { message: "Server misconfiguration: API key missing" },
      { status: 500 },
    );
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi`,
      {
        params: { query, api_key: TMDB_API_KEY, page: 1 },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "TMDB API Axios Error:",
        error.response?.data || error.message,
      );
      return NextResponse.json(
        {
          message: "Something went wrong",
          error: error.response?.data || error.message,
        },
        { status: 500 },
      );
    } else if (error instanceof Error) {
      console.error("Unexpected Error:", error.message);
      return NextResponse.json(
        { message: "Something went wrong", error: error.message },
        { status: 500 },
      );
    } else {
      console.error("Unknown Error:", error);
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
