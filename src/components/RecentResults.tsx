import { ArrowUp, ArrowDown, Check, X } from "lucide-react";

const RecentResults = () => {
  const results = [
    { round: 1284, result: 'up', userPrediction: 'up', won: true, payout: '+$15.00' },
    { round: 1283, result: 'down', userPrediction: 'up', won: false, payout: '-$10.00' },
    { round: 1282, result: 'up', userPrediction: 'up', won: true, payout: '+$22.50' },
    { round: 1281, result: 'up', userPrediction: 'up', won: true, payout: '+$8.00' },
    { round: 1280, result: 'down', userPrediction: 'down', won: true, payout: '+$18.00' },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg font-bold text-foreground mb-4">
        Recent Results
      </h3>
      
      <div className="space-y-2">
        {results.map((result, index) => (
          <div 
            key={result.round}
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">#{result.round}</span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                result.result === 'up' ? 'bg-bullish/20' : 'bg-bearish/20'
              }`}>
                {result.result === 'up' ? (
                  <ArrowUp className="w-3 h-3 text-bullish" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-bearish" />
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                result.won ? 'bg-bullish/20' : 'bg-bearish/20'
              }`}>
                {result.won ? (
                  <Check className="w-3 h-3 text-bullish" />
                ) : (
                  <X className="w-3 h-3 text-bearish" />
                )}
              </div>
              <span className={`text-sm font-semibold ${
                result.won ? 'text-bullish' : 'text-bearish'
              }`}>
                {result.payout}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentResults;
