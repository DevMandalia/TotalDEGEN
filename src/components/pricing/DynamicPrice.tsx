
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
      // Generate random number between -100 and 20,000
      const newPrice = Math.floor(Math.random() * 20101) - 100; // 20101 to include 20,000, then subtract 100
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
