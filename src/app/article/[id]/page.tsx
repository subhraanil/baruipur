import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  const articles = db.getArticles({ status: 'published' });
  return articles.map(a => ({
    id: a.id
  }));
}

export default function ArticleRedirectPage({ params }: ArticlePageProps) {
  const article = db.getArticleById(params.id);

  if (!article) {
    notFound();
  }

  // Redirect permanently to the new /post-title URL structure
  redirect('/' + encodeURI(article.slug || article.id));
}
