import MovieInputSearch from '@/components/MovieInputSearch';
import NavBar from '@/components/NavBar';
import SearchedMovies from '@/components/SearchedMovies';
import MovieTwistTitle from '@/components/MovieTwistTitle';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar>
        <MovieTwistTitle />
        <MovieInputSearch />
      </NavBar>

      <main className="flex-grow">
        <SearchedMovies />
      </main>

      <footer className="text-sm md:text-base">
        <Footer />
      </footer>
    </div>
  );
}
