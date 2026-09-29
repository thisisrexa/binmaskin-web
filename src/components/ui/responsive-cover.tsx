import Image from 'next/image';

export function ResponsiveCover({
  mobile,
  desktop,
  sizes,
  priority = false,
  className = 'object-cover',
}: {
  mobile: string;
  desktop: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  // ponytail: covers are the card; quality 100 keeps text baked into them sharp
  return (
    <>
      <Image
        src={mobile}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        quality={100}
        draggable={false}
        className={`${className} md:hidden`}
      />
      <Image
        src={desktop}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        quality={100}
        draggable={false}
        className={`${className} hidden md:block`}
      />
    </>
  );
}
