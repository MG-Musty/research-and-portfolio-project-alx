import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
        <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
          Eat Healthy Foods!!!
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
          At Mg Foods and Market store, our Foods are world class cuisine prepared from natural ingregient and farm products. Our market place is known with fresh grown and natural finished products.
          deliver all over the world cause we care for what you live to eat.
        </p>
        <UnderlineLink href="/store">Explore Foods and Market products</UnderlineLink>
      </div>
      <Image
        src="/mg food and market store.webp"
        layout="fill"
        loading="eager"
        priority={true}
        quality={90}
        objectFit="cover"
        alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
        className="absolute inset-0"
        draggable="false"
      />
    </div>
  )
}

export default Hero
