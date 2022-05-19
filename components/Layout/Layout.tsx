import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { AppNav, LandingNav } from "..";

export const Layout = ({ children }: any) => {
  const { pathname } = useRouter();
  const { initialize, isInitialized } = useMoralis();
  console.log("isInitialized: ", isInitialized);

  useEffect(() => {
    if (pathname != "/") {
      initialize();
    }
  }, [pathname]);

  return (
    <>
      {isInitialized && pathname != "/" ? <AppNav /> : <LandingNav />}
      <main>{children}</main>
    </>
  );
};
