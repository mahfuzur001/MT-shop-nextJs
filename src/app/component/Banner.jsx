import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full h-[600px]">
      <Image src="/product.png" fill alt="Main Banner" />
    </div>
  );
}
