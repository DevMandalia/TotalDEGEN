
"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Varun Buffet",
    role: "Oracle of Omaha (probably)",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "This is where I buy. The interface is so simple even I can use it, and I'm like 90 years old. 10/10 would recommend to my fellow boomers."
  },
  {
    name: "sbalaji",
    role: "Former Coinbase CTO",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "Don't miss this $#!& we're going to the moon 🌙 The API is actually pretty solid when it's not crashing. Built different."
  },
  {
    name: "Elon Musk Jr.",
    role: "Rocket Enthusiast",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "I bought Dogecoin here at $0.70. Still holding. The platform has great memes and the charts are pretty accurate... sometimes."
  },
  {
    name: "Cathie Woods",
    role: "Innovation Fund Manager",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "I've been using this platform since 2019 and it's revolutionary. The AI trading suggestions helped me lose money more efficiently than ever before."
  },
  {
    name: "SBF Jr.",
    role: "Definitely Not a Scammer",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "Legit platform, no rug pulls here. The security features are way better than my old exchange. Customer funds are definitely safu."
  },
  {
    name: "Michael Sailor",
    role: "Bitcoin Maximalist",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "I leveraged my company to buy Bitcoin here. Down 50% but diamond hands 💎🙌 The platform makes it easy to HODL through the pain."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden bg-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">Unreal testees</h2>
          <p className="text-muted-foreground text-lg">
            From totally legitimate celebrities who definitely use our platform
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
