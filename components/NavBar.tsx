type NavBarProps = {
  children: React.ReactNode;
};

const NavBar = ({ children }: NavBarProps) => {
  return (
    <nav>
      <div className="md:flex-row md:gap-12 flex flex-col gap-4 justify-center p-10">
        {children}
      </div>
    </nav>
  );
};

export default NavBar;
