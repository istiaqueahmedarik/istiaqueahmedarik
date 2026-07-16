import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="z-10 space-y-6">
          <h1 className="text-display text-7xl md:text-9xl uppercase tracking-tighter">
            Istiaque<br />Ahmed
          </h1>
          <p className="text-3xl md:text-5xl font-light italic tracking-wide">
            Software Engineer
          </p>
        </div>
        <div className="relative h-[600px] w-full grayscale contrast-125">
          <Image
            src="https://assets.vercel.com/image/upload/front/vercel/dark.png"
            alt="Istiaque Ahmed Arik"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-6 flex flex-col gap-4 text-black/70">
        <a href="https://github.com/istiaqueahmedarik" target="_blank" rel="noreferrer" className="hover:text-black">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/istiaqueahmedarik/" target="_blank" rel="noreferrer" className="hover:text-black">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
