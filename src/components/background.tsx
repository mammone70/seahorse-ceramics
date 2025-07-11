// import Image from "next/image";

export default function Background() {
  return (
    <div className="
        glow absolute 
        -z-10 
        aspect-square 
        w-full 
        bg-gradient-to-r
        from-sky-300 
        to-cyan-100 
        blur-3xl 
        filter" 
    />
    // <div className="relative">
    //   <Image
    //     src="/img/seahorse-bg.png" 
    //     alt="Background Image" 
    //     fill 
    //     objectFit="cover" 
    //     priority 
    //   /> 
    // </div>
  )
}
