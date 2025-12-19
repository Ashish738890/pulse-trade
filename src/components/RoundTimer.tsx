import { useEffect, useState } from "react";
import { Clock, Users, Trophy } from "lucide-react";

interface RoundTimerProps {
  roundNumber: number;
  onRoundEnd: () => void;
  onRoundStart: () => void;
}

const RoundTimer = ({ roundNumber, onRoundEnd, onRoundStart }: RoundTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [phase, setPhase] = useState<'betting' | 'locked' | 'calculating'>('betting');
  const [participants, setParticipants] = useState(127);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (phase === 'betting') {
            setPhase('locked');
            return 10; // Locked phase
          } else if (phase === 'locked') {
            setPhase('calculating');
            onRoundEnd();
            return 5; // Calculating phase
          } else {
            setPhase('betting');
            onRoundStart();
            setParticipants(Math.floor(100 + Math.random() * 100));
            return 60;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, onRoundEnd, onRoundStart]);

  const progress = phase === 'betting' 
    ? ((60 - timeLeft) / 60) * 100 
    : phase === 'locked' 
      ? ((10 - timeLeft) / 10) * 100 
      : ((5 - timeLeft) / 5) * 100;

  const phaseColors = {
    betting: 'from-monad to-accent',
    locked: 'from-yellow-500 to-orange-500',
    calculating: 'from-bullish to-accent',
  };

  const phaseLabels = {
    betting: 'Betting Open',
    locked: 'Bets Locked',
    calculating: 'Calculating Results',
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-monad/20 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-monad" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Round</p>
            <p className="font-display font-bold text-foreground">#{roundNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{participants} players</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium bg-gradient-to-r ${phaseColors[phase]} bg-clip-text text-transparent`}>
            {phaseLabels[phase]}
          </span>
          <div className="flex items-center gap-1 text-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold text-lg">
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
        </div>
        
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${phaseColors[phase]} transition-all duration-1000 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Pool Info */}
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Pool</p>
          <p className="font-display font-bold text-foreground">$12,847</p>
        </div>
        <div className="text-center border-x border-border">
          <p className="text-xs text-muted-foreground mb-1">UP Pool</p>
          <p className="font-display font-bold text-bullish">$7,234</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">DOWN Pool</p>
          <p className="font-display font-bold text-bearish">$5,613</p>
        </div>
      </div>
    </div>
  );
};

export default RoundTimer;
