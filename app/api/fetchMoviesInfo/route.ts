import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

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

    let tmdbResponse;

    try {
      tmdbResponse = await axios.get(tmdbUrl, {
        params: { api_key: TMDB_API_KEY },
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return NextResponse.json(
          { message: "Movie or TV show not found in TMDB" },
          { status: 404 },
        );
      }
      throw error;
    }

    if (tmdbResponse?.data?.imdb_id) {
      omdbId = tmdbResponse.data.imdb_id;
    }

    if (!omdbId) {
      return NextResponse.json(
        { message: "IMDb ID not found for this movie or TV show" },
        { status: 404 },
      );
    }

    let omdbResponse;

    try {
      omdbResponse = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${omdbId}&plot=full`,
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return NextResponse.json(
          { message: "Movie or TV show not found in TMDB" },
          {
            status: 404,
          },
        );
      }

      throw error;
    }

    if (omdbResponse.data.Response === "False") {
      return NextResponse.json(
        { message: omdbResponse.data.Error || "Title not found in OMDB" },
        { status: 404 },
      );
    }

    return NextResponse.json(omdbResponse.data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
