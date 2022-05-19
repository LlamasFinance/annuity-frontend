import Link from "next/link";

export const LandingNav = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost text-xl normal-case">daisyUI</a>
        </Link>
      </div>
      <div className="flex-none">
        <Link href="/app">
          <button className="btn btn-ghost">Get Started</button>
        </Link>
      </div>
    </div>
  );
};
