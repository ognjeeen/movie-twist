const MovieTwistTitle = () => {
  return (
    <h1 className="lg:text-6xl text-4xl text-primaryLight text-center m-auto font-Bungee">
      <span>Movie</span>
      <span
        className="inset-0 z-[-1] text-transparent"
        style={{ WebkitTextStroke: '2px #e1ab65', content: 'Twist' }}
      >
        Twist
      </span>
    </h1>
  );
};

export default MovieTwistTitle;
