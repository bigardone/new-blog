import Head from 'next/head';
import fs from 'fs';
import Link from 'next/link';
import matter from 'gray-matter';
import Layout from '../components/layout';
import { filenameToSlug } from '../pageUtils';

export default function Home({ posts }) {
  return (
    <div className="flex flex-col content-center justify-center min-h-screen pl-1 pr-1">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content="" />
        <title>Code, Love & Boards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {posts.map(({
          frontmatter: {
            title, excerpt, date, tags,
          }, slug,
        }) => (
          <article key={title}>
            <header>
              <Link href="/blog/[year]/[month]/[day]/[slug]" as={`/blog/${slug}`}>
                <a className="mb-1 text-3xl font-semibold text-orange-600">
                  {title}
                </a>
              </Link>
              <span className="mb-4 text-sm">{date}</span>
            </header>
            <section>
              <p className="mb-8 text-xl">{excerpt}</p>
            </section>
          </article>
        ))}
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/content`);

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`content/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetadata);

    // Convert post date to format: Month day, Year
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    let formattedDate = '';

    if (data.date instanceof Date) formattedDate = data.date.toLocaleDateString('en-US', options);
    else formattedDate = new Date(data.date).toLocaleDateString('en-US', options);

    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filenameToSlug(filename),
      frontmatter,
    };
  }).reverse();

  return {
    props: {
      posts,
    },
  };
}
