import { TrendingUp, Wallet, Award, Zap } from "lucide-react";

const StatsPanel = () => {
  const stats = [
    {
      icon: Wallet,
      label: "Your Balance",
      value: "$1,250.00",
      change: "+$125.50",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Win Rate",
      value: "67%",
      change: "+5%",
      positive: true,
    },
    {
      icon: Award,
      label: "Total Wins",
      value: "24",
      change: "Last 30 days",
      positive: true,
    },
    {
      icon: Zap,
      label: "Streak",
      value: "5",
      change: "Hot streak!",
      positive: true,
    },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg font-bold text-foreground mb-4">
        Your Stats
      </h3>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-10 h-10 rounded-xl bg-monad/20 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-monad" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="font-display font-bold text-foreground">{stat.value}</p>
            </div>
            <span className={`text-xs font-medium ${stat.positive ? 'text-bullish' : 'text-bearish'}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
