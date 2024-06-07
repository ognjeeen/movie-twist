import FoundResults from '@/components/FoundResults';
import MovieInputSearch from '@/components/MovieInputSearch';
import NavBar from '@/components/NavBar';
import SearchedMovies from '@/components/SearchedMovies';

export default function Home() {
  return (
    <>
      <NavBar>
        <MovieInputSearch />
        <FoundResults />
      </NavBar>
      <main>
        <SearchedMovies />
      </main>
    </>
  );
}
