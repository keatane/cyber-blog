import React, { useMemo } from 'react';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const articleFiles = import.meta.glob('./articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const Blog = () => {
  const articles = useMemo(() => {
    return Object.entries(articleFiles)
      .map(([path, content]) => {
        const slug = path.split('/').pop().replace(/\.md$/, '');
        const article = parseMarkdownMeta(content);

        return {
          slug,
          ...article,
        };
      })
      .filter((article) => article.title)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  const recentArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-cyan-500/30">
      <section className="relative px-6 pt-32 pb-24 lg:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-500 mb-6">
            <span>By Kevin Cattaneo</span>
            <span className="text-slate-600">|</span>
            <span>articles & research</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[0.9] mb-8">
            Cyber Blog
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-serif italic leading-relaxed">
            Deeper insights into{' '} <span className="text-white">worldwide</span> cybersecurity events.
          </p>
        </div>
      </section>

      <section className="px-6 py-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-mono text-cyan-500 mb-12 uppercase tracking-widest">
            Latest Article
          </h2>

          {recentArticles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {recentArticles.map((article, index) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  featured={index === 0}
                />
              ))}
            </div>
          ) : (
            <p className="text-slate-600 font-mono text-sm">
              No articles available.
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-mono text-cyan-500 mb-12 uppercase tracking-widest">
            All Articles
          </h2>

          <div className="space-y-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/cyber-blog/articles/${article.slug}`}
                className="group grid md:grid-cols-[180px_1fr_auto] gap-4 md:gap-8 items-center px-4 py-8 border-b border-white/5 rounded-lg hover:bg-white/[0.02] transition-all"
              >
                <span className="text-xs font-mono text-slate-600">
                  {formatDate(article.date)}
                </span>

                <div>
                  <h3 className="text-2xl font-serif text-white group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                    {article.short}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-slate-600 group-hover:text-cyan-500 transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

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

const ArticleCard = ({ article, featured }) => (
  <Link
    to={`/cyber-blog/articles/${article.slug}`}
    className={`group block p-7 border rounded-2xl transition-all hover:translate-y-[-4px] ${
      featured
        ? 'bg-cyan-500/[0.03] border-cyan-500/20 md:col-span-2'
        : 'bg-black/40 border-white/10 hover:border-cyan-500/40'
    }`}
  >
    <div className="flex items-center justify-between mb-5">
      <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
        {formatDate(article.date)}
      </span>

      <ArrowUpRight
        size={17}
        className="text-slate-600 group-hover:text-cyan-500 transition-colors"
      />
    </div>

    <h3
      className={`font-serif text-white group-hover:text-cyan-400 transition-colors ${
        featured ? 'text-3xl md:text-4xl' : 'text-2xl'
      }`}
    >
      {article.title}
    </h3>

    <p className="text-sm text-slate-500 mt-3 max-w-xl">
      {article.short}
    </p>
  </Link>
);

const parseMarkdownMeta = (markdown) => {
  const normalized = markdown.replace(/\r\n/g, '\n').trim();

  const match = normalized.match(
    /^---\n([\s\S]*?)\n---/
  );

  if (!match) {
    return {
      title: '',
      date: '',
      short: '',
    };
  }

  const metadata = {};

  match[1].split('\n').forEach((line) => {
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
    title: metadata.title || '',
    date: metadata.date || '',
    short: metadata.short || '',
  };
};

const formatDate = (date) => {
  if (!date) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
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

export default Blog;