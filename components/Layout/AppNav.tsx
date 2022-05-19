import Link from "next/link";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { WalletButton } from "../";

export const AppNav = () => {
  const { isAuthenticated, authenticate, logout, user } = useMoralis();
  const router = useRouter();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/app">
          <a className="btn btn-ghost text-xl normal-case">daisyUI</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {!isAuthenticated && (
            <>
              <li>
                <Link href="/authenticate">
                  <a>Signup</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() =>
                    authenticate({
                      onError: () => router.push("/authenticate"),
                    })
                  }
                >
                  <a>Login</a>
                </button>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <button onClick={() => logout()}>
                  <a>Logout</a>
                </button>
              </li>
              <li>
                <WalletButton />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

/**
 * Referemces:
 * auth and authenticate - https://github.com/MoralisWeb3/react-moralis#authenticate
 */
