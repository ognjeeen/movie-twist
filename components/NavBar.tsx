type NavBarProps = {
  children: React.ReactNode;
};

const NavBar = ({ children }: NavBarProps) => {
  return (
    <nav>
      <div className="flex flex-col mt-10 justify-center m-auto items-center gap-4">
        {children}
      </div>
    </nav>
  );
};

export default NavBar;
