import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const features = [
    { icon: Zap, text: "Parallel Processing" },
    { icon: Clock, text: "60-Second Rounds" },
    { icon: Shield, text: "On-Chain Settlement" },
  ];

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-monad/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-bullish animate-pulse" />
            <span className="text-muted-foreground">Powered by Monad's Parallel EVM</span>
          </div>

          <h1 
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            Predict. Trade.
            <br />
            <span className="text-gradient">Win Instantly.</span>
          </h1>

          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            Real-time price predictions with instant on-chain settlement. 
            Join thousands of traders in 60-second prediction rounds.
          </p>

          <div 
            className="flex flex-wrap items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <Button size="lg" className="gap-2">
              Start Trading
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="glass" size="lg">
              How it Works
            </Button>
          </div>

          <div 
            className="flex flex-wrap items-center justify-center gap-6 pt-6 animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            {features.map((feature) => (
              <div 
                key={feature.text}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <feature.icon className="w-4 h-4 text-monad" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
