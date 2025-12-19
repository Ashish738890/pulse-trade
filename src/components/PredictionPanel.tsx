import { useState } from "react";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PredictionPanelProps {
  roundActive: boolean;
  onPredict: (direction: 'up' | 'down', amount: number) => void;
}

const PredictionPanel = ({ roundActive, onPredict }: PredictionPanelProps) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState<'up' | 'down' | null>(null);
  const { toast } = useToast();

  const amounts = [5, 10, 25, 50, 100];

  const handlePredict = async (direction: 'up' | 'down') => {
    if (!roundActive) {
      toast({
        title: "Round not active",
        description: "Wait for the next round to start",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setPrediction(direction);

    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPredict(direction, selectedAmount);
    setIsSubmitting(false);
    
    toast({
      title: "Prediction placed!",
      description: `You predicted ${direction.toUpperCase()} with $${selectedAmount}`,
    });
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-foreground mb-1">
          Make Your Prediction
        </h3>
        <p className="text-sm text-muted-foreground">
          Will the price go up or down?
        </p>
      </div>

      {/* Amount Selection */}
      <div className="space-y-3">
        <label className="text-sm text-muted-foreground">Select Amount</label>
        <div className="grid grid-cols-5 gap-2">
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                selectedAmount === amount
                  ? 'bg-monad text-background glow-monad'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      {/* Prediction Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="bullish"
          size="xl"
          onClick={() => handlePredict('up')}
          disabled={isSubmitting || !roundActive || prediction !== null}
          className="flex-col h-24 gap-1"
        >
          {isSubmitting && prediction === 'up' ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <ArrowUp className="w-6 h-6" />
              <span className="text-lg">UP</span>
            </>
          )}
        </Button>

        <Button
          variant="bearish"
          size="xl"
          onClick={() => handlePredict('down')}
          disabled={isSubmitting || !roundActive || prediction !== null}
          className="flex-col h-24 gap-1"
        >
          {isSubmitting && prediction === 'down' ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <ArrowDown className="w-6 h-6" />
              <span className="text-lg">DOWN</span>
            </>
          )}
        </Button>
      </div>

      {prediction && (
        <div className={`text-center p-4 rounded-xl ${
          prediction === 'up' ? 'bg-bullish/10 border border-bullish/30' : 'bg-bearish/10 border border-bearish/30'
        }`}>
          <p className={`font-semibold ${prediction === 'up' ? 'text-bullish' : 'text-bearish'}`}>
            You predicted {prediction.toUpperCase()} with ${selectedAmount}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Waiting for round to end...
          </p>
        </div>
      )}

      {!roundActive && !prediction && (
        <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border">
          <p className="text-muted-foreground text-sm">
            Round ended. Waiting for next round...
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictionPanel;
