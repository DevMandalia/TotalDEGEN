
import { useState, useEffect } from "react";

interface DynamicPriceProps {
  basePrice: number;
  tier: string;
}

export const DynamicPrice = ({ basePrice, tier }: DynamicPriceProps) => {
  const [price, setPrice] = useState(basePrice);

  useEffect(() => {
    if (tier === "Basic Trader") return; // Keep $0 static
    
    const interval = setInterval(() => {
      // Fluctuate between 80% and 120% of base price
      const fluctuation = (Math.random() * 0.4 + 0.8);
      const newPrice = Math.round(basePrice * fluctuation);
      setPrice(newPrice);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [basePrice, tier]);

  if (tier === "Basic Trader") {
    return <span className="text-4xl font-bold">$0</span>;
  }

  return (
    <span className="text-4xl font-bold text-primary animate-pulse">
      ${price}
    </span>
  );
};
