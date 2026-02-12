import { motion } from 'framer-motion';

interface PageBannerProps {
  title: string;
  titleEn: string;
  image: string;
}

export default function PageBanner({ title, titleEn, image }: PageBannerProps) {
  return (
    <div className="relative h-[200px] lg:h-[280px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold mb-2 tracking-wider"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl lg:text-2xl text-[#F5B800] font-medium"
        >
          {titleEn}
        </motion.p>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 50 480 50 720 30C960 10 1200 10 1440 30V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
