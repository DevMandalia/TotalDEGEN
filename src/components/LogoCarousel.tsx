
import { motion } from "framer-motion";

const LogoCarousel = () => {
  // Using different placeholder images for the legendary failures
  const logos = [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=80&fit=crop&crop=center", // Tech company placeholder
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=80&fit=crop&crop=center", // Data/analytics placeholder
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop&crop=center", // Energy/corporate placeholder
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=200&h=80&fit=crop&crop=center", // Crypto/blockchain placeholder
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200&h=80&fit=crop&crop=center", // Finance placeholder
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-background/50 backdrop-blur-sm py-12 mt-20">
      <motion.div 
        className="flex space-x-16"
        initial={{ opacity: 0, x: "0%" }}
        animate={{
          opacity: 1,
          x: "-50%"
        }}
        transition={{
          opacity: { duration: 0.5 },
          x: {
            duration: 15, // Reduced from 25 to 15 seconds
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }
        }}
        style={{
          width: "fit-content",
          display: "flex",
          gap: "4rem"
        }}
      >
        {extendedLogos.map((logo, index) => (
          <motion.img
            key={`logo-${index}`}
            src={logo}
            alt={`Bankrupt company logo ${index + 1}`}
            className="h-8 object-contain grayscale opacity-60"
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
