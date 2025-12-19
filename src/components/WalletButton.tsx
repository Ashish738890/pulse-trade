import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const WalletButton = () => {
  const { toast } = useToast();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={openConnectModal}
                    className="gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={openChainModal}
                  >
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={openChainModal}
                    className="gap-2 hidden sm:flex"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        className="w-4 h-4 rounded-full"
                      />
                    )}
                    <span className="text-xs">{chain.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="glass" size="sm" className="gap-2">
                        <div className="w-2 h-2 rounded-full bg-bullish animate-pulse" />
                        <span className="font-mono text-xs">
                          {account.displayName}
                        </span>
                        {account.displayBalance && (
                          <span className="text-muted-foreground text-xs hidden sm:inline">
                            ({account.displayBalance})
                          </span>
                        )}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 glass-card border-glass-border"
                    >
                      <div className="px-3 py-2">
                        <p className="text-xs text-muted-foreground">Connected</p>
                        <p className="font-mono text-sm text-foreground truncate">
                          {account.address}
                        </p>
                        {account.displayBalance && (
                          <p className="text-sm font-semibold text-foreground mt-1">
                            {account.displayBalance}
                          </p>
                        )}
                      </div>
                      <DropdownMenuSeparator className="bg-border" />
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(account.address);
                          toast({
                            title: 'Address copied',
                            description: 'Wallet address copied to clipboard',
                          });
                        }}
                        className="gap-2 cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Address
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          window.open(
                            `https://etherscan.io/address/${account.address}`,
                            '_blank'
                          )
                        }
                        className="gap-2 cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on Explorer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border" />
                      <DropdownMenuItem
                        onClick={openAccountModal}
                        className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletButton;
