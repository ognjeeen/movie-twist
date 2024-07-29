import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('selectedMovieDetailsId');

  if (!id) {
    return NextResponse.json(
      { message: 'ID parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${KEY}&i=${id}&plot=full`
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
