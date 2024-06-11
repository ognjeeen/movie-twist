import FoundResultsMessage from '@/components/FoundResultsMessage';
import MovieInputSearch from '@/components/MovieInputSearch';
import NavBar from '@/components/NavBar';
import SearchedMovies from '@/components/SearchedMovies';

export default function Home() {
  return (
    <>
      <NavBar>
        <MovieInputSearch />
        <FoundResultsMessage />
      </NavBar>
      <main>
        <SearchedMovies />
      </main>
    </>
  );
}
