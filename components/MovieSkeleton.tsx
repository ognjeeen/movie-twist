import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MovieSkeleton = () => (
  <div className="flex-shrink-0 w-36 flex flex-col items-center">
    <Skeleton
      width={144}
      height={208}
      baseColor="#343a40"
      highlightColor="#212529"
    />

    <Skeleton
      width={144}
      style={{ marginTop: '8px' }}
      baseColor="#343a40"
      highlightColor="#212529"
    />
  </div>
);

export default MovieSkeleton;
