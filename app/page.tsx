import MovieInputSearch from '@/components/MovieInputSearch';
import NavBar from '@/components/NavBar';
import SearchedMovies from '@/components/SearchedMovies';
import MovieTwistTitle from '@/components/MovieTwistTitle';

export default function Home() {
  return (
    <>
      <NavBar>
        <MovieTwistTitle />
        <MovieInputSearch />
      </NavBar>
      <main>
        <SearchedMovies />
      </main>
    </>
  );
}
