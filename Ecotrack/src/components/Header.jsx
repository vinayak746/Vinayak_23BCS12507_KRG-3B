const Header = ({ title }) => {
  return (
    <header
        className="bg-gray-500 text-white p-4 mb-4 text-center text-2xl font-bold rounded-lg border-4 border-gray-700 "
    >
      <h1>{title}</h1>
    </header>
  );
};
export default Header;
