
import { motion } from "framer-motion";

const LogoCarousel = () => {
  // Default tech/crypto company logos
  const logos = [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=80&fit=crop&crop=center", // Tech company
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=80&fit=crop&crop=center", // Data/analytics
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=80&fit=crop&crop=center", // Corporate
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=200&h=80&fit=crop&crop=center", // Blockchain
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200&h=80&fit=crop&crop=center", // Finance
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
            duration: 15,
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
            alt={`Company logo ${index + 1}`}
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
