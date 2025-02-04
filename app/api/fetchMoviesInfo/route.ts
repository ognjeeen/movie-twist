import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("selectedMovieDetailsId");
  const mediaType = searchParams.get("mediaType");

  if (!id) {
    return NextResponse.json(
      { message: "ID parameter is required" },
      { status: 400 },
    );
  }

  try {
    let omdbId = null;

    const tmdbUrl =
      mediaType === "movie"
        ? `https://api.themoviedb.org/3/movie/${id}`
        : `https://api.themoviedb.org/3/tv/${id}/external_ids`;

    const tmdbResponse = await axios
      .get(tmdbUrl, { params: { api_key: TMDB_API_KEY } })
      .catch(() => null);

    if (tmdbResponse?.data?.imdb_id) {
      omdbId = tmdbResponse.data.imdb_id;
    }

    if (!omdbId) {
      return NextResponse.json(
        { message: "IMDb ID not found for this movie or TV show" },
        { status: 404 },
      );
    }

    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${omdbId}&plot=full`,
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
