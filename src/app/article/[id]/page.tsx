import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';

export default function ArticleRedirectPage({ params }: ArticlePageProps) {
  const article = db.getArticleById(params.id);

  if (!article) {
    notFound();
  }

  // Redirect permanently to the new /post-title URL structure
  redirect('/' + encodeURI(article.slug || article.id));
}
