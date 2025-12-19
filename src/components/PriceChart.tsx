import { useEffect, useState, useRef } from "react";

const PriceChart = () => {
  const [prices, setPrices] = useState<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState(1847.23);
  const [priceChange, setPriceChange] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Initialize with some data
    const initialPrices = Array.from({ length: 50 }, (_, i) => 
      1800 + Math.sin(i * 0.2) * 50 + Math.random() * 30
    );
    setPrices(initialPrices);

    // Simulate real-time price updates
    const interval = setInterval(() => {
      setPrices(prev => {
        const lastPrice = prev[prev.length - 1] || 1847;
        const change = (Math.random() - 0.5) * 10;
        const newPrice = Math.max(1700, Math.min(2000, lastPrice + change));
        
        setCurrentPrice(newPrice);
        setPriceChange(change);
        
        const newPrices = [...prev.slice(-49), newPrice];
        return newPrices;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minPrice = Math.min(...prices, 1700);
  const maxPrice = Math.max(...prices, 2000);
  const priceRange = maxPrice - minPrice || 1;

  const getY = (price: number) => {
    return 180 - ((price - minPrice) / priceRange) * 160;
  };

  const pathD = prices.length > 1
    ? prices.map((price, i) => {
        const x = (i / (prices.length - 1)) * 600;
        const y = getY(price);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ')
    : '';

  const areaD = pathD 
    ? `${pathD} L 600 180 L 0 180 Z`
    : '';

  const isPositive = priceChange >= 0;

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className={`absolute inset-0 opacity-20 transition-all duration-500 ${
          isPositive ? 'bg-gradient-to-t from-bullish/30 to-transparent' : 'bg-gradient-to-t from-bearish/30 to-transparent'
        }`} 
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">MON/USDT</p>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-foreground">
                ${currentPrice.toFixed(2)}
              </span>
              <span className={`text-sm font-semibold ${isPositive ? 'text-bullish' : 'text-bearish'}`}>
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{((priceChange / currentPrice) * 100).toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full animate-pulse ${isPositive ? 'bg-bullish' : 'bg-bearish'}`} />
            <span className="text-xs text-muted-foreground">LIVE</span>
          </div>
        </div>

        <svg 
          ref={svgRef}
          viewBox="0 0 600 200" 
          className="w-full h-48"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "hsl(160, 84%, 45%)" : "hsl(0, 72%, 55%)"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "hsl(160, 84%, 45%)" : "hsl(0, 72%, 55%)"} stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line 
              key={i}
              x1="0" 
              y1={40 + i * 35} 
              x2="600" 
              y2={40 + i * 35}
              stroke="hsl(222, 30%, 18%)"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <path
            d={areaD}
            fill="url(#chartGradient)"
            className="transition-all duration-300"
          />

          {/* Main line */}
          <path
            d={pathD}
            fill="none"
            stroke={isPositive ? "hsl(160, 84%, 45%)" : "hsl(0, 72%, 55%)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className="transition-all duration-300"
          />

          {/* Current price dot */}
          {prices.length > 0 && (
            <circle
              cx="600"
              cy={getY(prices[prices.length - 1])}
              r="6"
              fill={isPositive ? "hsl(160, 84%, 45%)" : "hsl(0, 72%, 55%)"}
              className="animate-pulse"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default PriceChart;
