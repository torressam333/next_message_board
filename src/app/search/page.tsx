interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  return <div>{searchParams.term}</div>;
};

export default SearchPage;
