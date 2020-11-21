import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Layout from '../../../../../components/layout';
import Tags from '../../../../../components/tags';
import { filenameToParams, filenameToSlug, slugToPath } from '../../../../../pageUtils';

const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter
    language={language}
  >
    {value}
  </SyntaxHighlighter>
);

export default function Post({ content, frontmatter }) {
  const {
    title, date, tags, excerpt,
  } = frontmatter;

  return (
    <Layout>
      <article>
        <header>
          <h1 className="mb-5 text-6xl font-extrabold">{title}</h1>
          <h3 className="mb-5 text-2xl text-gray-500">{excerpt}</h3>
          <div className="text-sm text-gray-500">
            Published
            {date}
            <Tags tags={tags} />
          </div>
        </header>
        <section className="prose prose-xl prose-purple">
          <ReactMarkdown
            allowDangerousHtml
            escapeHtml={false}
            source={content}
            renderers={{ code: CodeBlock }}
          />
        </section>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync('content');
  const paths = files.map(filename => ({
    params: filenameToParams(filename),
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: {
    year, month, day, slug,
  },
}) {
  const markdownWithMetadata = fs
    .readFileSync(path.join('content', `${slugToPath(year, month, day, slug)}.html.markdown`))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

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
    props: {
      content,
      frontmatter,
    },
  };
}
