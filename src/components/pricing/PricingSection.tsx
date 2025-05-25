
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";
import { DynamicPrice } from "./DynamicPrice";

const PricingTier = ({
  name,
  basePrice,
  description,
  features,
  isPopular,
}: {
  name: string;
  basePrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}) => (
  <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Most Delusional
        </span>
      )}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <div className="mb-4">
        <DynamicPrice basePrice={basePrice} tier={name} />
        {name !== "Basic Trader" && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full">
        Let's Gamble
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Choose Your{" "}
          <span className="text-gradient font-medium">Destruction Plan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Pick your poison with our totally reasonable pricing that changes faster than crypto markets
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingTier
          name="Basic Trader"
          basePrice={0}
          description="For beginners who want to lose money slowly and responsibly"
          features={[
            "All features available",
            "Basic confusion included",
            "Simple ways to lose money",
            "Email support (if we remember)",
            "Access to our meme collection"
          ]}
        />
        <PricingTier
          name="Serious Gambler"
          basePrice={29}
          description="For those ready to lose money with style and sophistication"
          features={[
            "All features available",
            "Advanced losing techniques",
            "Margin trading (lose faster!)",
            "Priority panic support",
            "API to automate your losses",
            "Exclusive regret dashboard"
          ]}
          isPopular
        />
        <PricingTier
          name="Top Dog"
          basePrice={199}
          description="For legends who want to lose institutional amounts of money"
          features={[
            "All features available",
            "Unlimited losing potential",
            "OTC desk (Over The Counter crying)",
            "Personal bankruptcy consultant",
            "Custom API for maximum damage",
            "24/7 therapy hotline",
            "Complimentary tissues"
          ]}
        />
      </div>
    </section>
  );
};
