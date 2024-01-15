import { redirect } from "next/navigation";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import PostList from "@/components/posts/PostList";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const { term } = searchParams;

  if (!term) redirect("/");

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
};

export default SearchPage;
