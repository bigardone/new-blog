import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === '/';

  const header = isRoot ? (
    <h1 className="mb-8">
      <Link href="/">
        <a className="text-6xl font-black text-black no-underline">Code, Love & Boards</a>
      </Link>
    </h1>
  ) : (
    <h1 className="mb-2">
      <Link href="/">
        <a className="text-2xl font-black text-black no-underline">Code, Love & Boards</a>
      </Link>
    </h1>
  );

  return (
    <div className="px-4 py-8 mx-auto max-w-screen-md">
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        ©
        {' '}
        {new Date().getFullYear()}
        , Built with
        {' '}
        <a href="https://nextjs.org/">Next.js</a>
        {' '}
        &#128293;
      </footer>
    </div>
  );
}
