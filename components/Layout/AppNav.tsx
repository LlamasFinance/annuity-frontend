import Link from "next/link";
import { ConnectButton } from "web3uikit";
import { CHAIN_ID } from "../../constants";

export const AppNav = () => {
  return (
    <div className="AppNav navbar bg-base-100">
      <div className="flex-1 justify-between">
        <Link href="/">
          <div className="flex justify-start items-center cursor-pointer">
            <img src='images/black-logo.svg' alt="Logo" 
             className="h-[64px] "
            />
            <p className="font-extrabold text-lg font-sans">Llamas Finances</p>
          </div>
        </Link>
        <ul className="AppNav__links">
          <li className="AppNav__link">
            <Link href="/app/market">Market</Link>
          </li>
          <li className="AppNav__link">
            <Link href="/app/account">My account</Link>
          </li>
        </ul>
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
