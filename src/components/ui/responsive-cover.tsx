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
  return (
    <>
      <Image
        src={mobile}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className={`${className} md:hidden`}
      />
      <Image
        src={desktop}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className={`${className} hidden md:block`}
      />
    </>
  );
}
