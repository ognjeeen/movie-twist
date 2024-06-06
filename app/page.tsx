import FoundResults from '@/components/FoundResults';
import MovieSearch from '@/components/MovieSearch';
import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar>
        <MovieSearch />
        <FoundResults />
      </NavBar>
    </>
  );
}
