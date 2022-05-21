import Link from "next/link";
import { ConnectButton } from "web3uikit";
import { CHAIN_ID } from "../../constants";

export const AppNav = () => {
  return (
    <div className="AppNav navbar bg-base-100">
      <div className="flex-1">
        <Link href="/app">
          <a className="btn btn-ghost text-xl normal-case">daisyUI</a>
        </Link>
      </div>
      <div className="flex-none">
        <ConnectButton
          chainId={CHAIN_ID}
          moralisAuth={true}
          signingMessage="Thanks for connecting!"
        />
      </div>
    </div>
  );
};

/**
 * Referemces:
 * auth and authenticate - https://github.com/MoralisWeb3/react-moralis#authenticate
 */
