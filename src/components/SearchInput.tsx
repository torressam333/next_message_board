"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import * as actions from "@/actions";

const SearchInput = () => {
  const searchParams = useSearchParams();

  return (
    <Suspense>
      <form action={actions.search}>
        <Input
          type="search"
          placeholder="Search..."
          className="w-[20em]"
          defaultValue={searchParams.get("term") || ""}
          name="term"
        />
      </form>
    </Suspense>
  );
};

export default SearchInput;
