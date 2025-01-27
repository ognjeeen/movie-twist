type NavBarProps = {
  children: React.ReactNode;
};

const NavBar = ({ children }: NavBarProps) => {
  return (
    <nav>
      <div className="m-auto mt-10 flex flex-col items-center justify-center gap-4">
        {children}
      </div>
    </nav>
  );
};

export default NavBar;
