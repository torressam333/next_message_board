import Link from "next/link";
import PostShow from "@/components/posts/PostShow";
import CommentList from "@/components/comments/CommentList";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import paths from "@/paths";
import { Suspense } from "react";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Return to {slug}
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
