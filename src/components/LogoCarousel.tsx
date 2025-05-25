
import { motion } from "framer-motion";

const LogoCarousel = () => {
  // Using placeholder images for the legendary failures
  const logos = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=80&fit=crop&crop=center", // FTX placeholder
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=80&fit=crop&crop=center", // Mt. Gox placeholder
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=80&fit=crop&crop=center", // Enron placeholder
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=80&fit=crop&crop=center", // Cambridge Analytica placeholder
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=80&fit=crop&crop=center", // Another failure placeholder
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
