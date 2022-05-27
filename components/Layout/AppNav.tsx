import Link from "next/link";
import { ConnectButton } from "web3uikit";
import { CHAIN_ID } from "../../constants";
import { useMoralis } from "react-moralis";
import { AiOutlineUser } from "react-icons/ai";

export const AppNav = () => {
  const { user } = useMoralis();
  const hasUsername = user?.has("hasUsername");
  const username = user?.get("username");

  return (
    <div className="AppNav navbar bg-base-100">
      <div className="flex-1 justify-between">
        <Link href="/">
          <div className="flex cursor-pointer items-center justify-start">
            <img
              src="/images/black-logo.svg"
              alt="Logo"
              className="h-[64px] "
            />
            <p className="font-sans text-lg font-extrabold">Llamas Finances</p>
          </div>
        </Link>
        <ul className="AppNav__links">
          <li className="AppNav__link">
            <Link href="/app/market">Market</Link>
          </li>
          <li className="AppNav__link">
            <Link href="/app/account">
              <div className="ml-6 flex cursor-pointer items-center">
                <div className="flex items-center justify-center">
                  <AiOutlineUser />
                </div>
                <p className="ml-1">{hasUsername ? username : "My account"}</p>
              </div>
            </Link>
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
