export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-sm font-medium">
        <a href="/" className="text-black font-bold tracking-tight">
          © Istiaque Ahmed Arik
        </a>
        <div className="hidden md:flex gap-8">
          <a href="#about" className="text-black/70 hover:text-black transition-colors">About</a>
          <a href="#projects" className="text-black/70 hover:text-black transition-colors">Projects</a>
          <a href="#contact" className="text-black/70 hover:text-black transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}
