import React, { useMemo } from 'react';
import { ArrowLeft, Github, Linkedin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ScrollToTop from './ScrollToTop';

const articleFiles = import.meta.glob('./articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const BlogArticle = () => {
  const { slug } = useParams();

  const article = useMemo(() => {
    const entry = Object.entries(articleFiles).find(([path]) => {
      const filename = path.split('/').pop().replace(/\.md$/, '');
      return filename === slug;
    });

    if (!entry) return null;

    return parseMarkdownArticle(entry[1]);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-300 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-500 mb-4">
            404
          </p>

          <h1 className="text-4xl font-serif text-white mb-8">
            Article not found
          </h1>

          <Link
            to="/"
            className="text-sm font-mono text-slate-500 hover:text-cyan-400 transition-colors"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-cyan-500/30">
      <main className="relative px-6 pt-28 pb-24 lg:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full -z-10" />

        <article className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-600 hover:text-cyan-400 transition-colors mb-14"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          <header className="mb-16">
            <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-5">
              {formatDate(article.date)}
            </p>

            <h1 className="text-4xl leading-[1.15] md:text-5xl md:leading-[0.95] font-serif font-bold text-white tracking-tight">
              {article.title}
            </h1>

            {article.short && (
              <p className="text-xl text-slate-500 font-serif italic leading-relaxed mt-7">
                {article.short}
              </p>
            )}
          </header>

          <div className="text-lg text-slate-400 leading-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-3xl font-serif font-bold text-white mt-14 mb-6">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="text-2xl font-serif font-bold text-white mt-12 mb-5">
                    {children}
                  </h3>
                ),

                h4: ({ children }) => (
                  <h4 className="text-xl font-serif font-bold text-white mt-10 mb-4">
                    {children}
                  </h4>
                ),

                p: ({ children }) => (
                  <p className="mb-8">
                    {children}
                  </p>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="text-slate-300">
                    {children}
                  </em>
                ),

                ul: ({ children }) => (
                  <ul className="mb-8 pl-7 space-y-3 list-disc marker:text-cyan-500">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-8 pl-7 space-y-3 list-decimal marker:text-cyan-500">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="pl-1">
                    {children}
                  </li>
                ),

                code: ({ inline, children }) =>
                  inline ? (
                    <code className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-cyan-400 font-mono text-[0.9em]">
                      {children}
                    </code>
                  ) : (
                    <code className="block p-5 bg-black/60 border border-white/10 rounded-xl overflow-x-auto text-sm text-cyan-300 font-mono">
                      {children}
                    </code>
                  ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                  >
                    {children}
                  </a>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-cyan-500/40 pl-6 my-8 text-slate-500 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {article.body}
            </ReactMarkdown>
          </div>
        </article>
      </main>

      <footer className="px-6 py-20 border-t border-white/5 text-center">
        <p className="font-serif text-xl text-slate-400 mb-8 italic">Reach out to me at:</p>
        <div className="flex justify-center gap-10 mb-12">
          <SocialIcon
            aria-label="Visit Kevin's GitHub Profile"
            icon={<Github />}
            link="https://github.com/keatane"
          />
          <SocialIcon
            aria-label="Connect with Kevin on LinkedIn"
            icon={<Linkedin />}
            link="https://it.linkedin.com/in/kevin-cattaneo-3b5a221bb"
          />
        </div>
        <p className="text-xs font-mono text-slate-600 uppercase tracking-widest">© 2026 Kevin Cattaneo</p>
      </footer>

      <ScrollToTop />
    </div>
  );
};

const parseMarkdownArticle = (markdown) => {
  const normalized = markdown.replace(/\r\n/g, '\n').trim();

  const frontMatterMatch = normalized.match(
    /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/
  );

  if (!frontMatterMatch) {
    return {
      title: 'Untitled Article',
      date: '',
      short: '',
      body: normalized,
    };
  }

  const metadata = {};

  frontMatterMatch[1].split('\n').forEach((line) => {
    const separator = line.indexOf(':');

    if (separator === -1) return;

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');

    metadata[key] = value;
  });

  return {
    title: metadata.title || 'Untitled Article',
    date: metadata.date || '',
    short: metadata.short || '',
    body: frontMatterMatch[2].trim(),
  };
};

const formatDate = (date) => {
  if (!date) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

const SocialIcon = ({ icon, link, ...props }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
    className="text-slate-500 hover:text-white hover:scale-110 transition-all"
  >
    {React.cloneElement(icon, { size: 28 })}
  </a>
);

export default BlogArticle;