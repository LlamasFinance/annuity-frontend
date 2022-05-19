import { ConnectButton } from "web3uikit";
import { CHAIN_ID } from "../../constants";

export const WalletButton = () => {
  return (
    <ConnectButton
      chainId={CHAIN_ID}
      moralisAuth={true}
      signingMessage="Thanks for connecting!"
    />
  );
};

/**
 * References:
 * ConnectButton - https://github.com/web3ui/web3uikit#connectbutton-
 */
