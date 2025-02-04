import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("selectedMovieDetailsId");

  if (!id) {
    return NextResponse.json(
      { message: "ID parameter is required" },
      { status: 400 },
    );
  }

  try {
    const tmdbResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: { id, api_key: TMDB_API_KEY },
      },
    );

    const omdbapi = tmdbResponse.data.imdb_id;
    // const omdbapi = "tt0120338";

    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${omdbapi}&plot=full`,
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
