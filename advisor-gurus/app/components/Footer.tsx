const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        {/* Company Info */}
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} Advisor Gurus. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
