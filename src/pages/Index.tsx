import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PriceChart from "@/components/PriceChart";
import PredictionPanel from "@/components/PredictionPanel";
import RoundTimer from "@/components/RoundTimer";
import StatsPanel from "@/components/StatsPanel";
import RecentResults from "@/components/RecentResults";

const Index = () => {
  const [roundNumber, setRoundNumber] = useState(1285);
  const [roundActive, setRoundActive] = useState(true);

  const handleRoundEnd = () => {
    setRoundActive(false);
  };

  const handleRoundStart = () => {
    setRoundNumber(prev => prev + 1);
    setRoundActive(true);
  };

  const handlePredict = (direction: 'up' | 'down', amount: number) => {
    console.log(`Prediction: ${direction} with $${amount}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />

        {/* Trading Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart & Timer */}
            <div className="lg:col-span-2 space-y-6">
              <PriceChart />
              <RoundTimer 
                roundNumber={roundNumber}
                onRoundEnd={handleRoundEnd}
                onRoundStart={handleRoundStart}
              />
            </div>

            {/* Right Column - Prediction & Stats */}
            <div className="space-y-6">
              <PredictionPanel 
                roundActive={roundActive}
                onPredict={handlePredict}
              />
              <StatsPanel />
              <RecentResults />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span>© 2024 MonadPulse. Built on</span>
                <span className="text-monad font-semibold">Monad</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Docs</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
