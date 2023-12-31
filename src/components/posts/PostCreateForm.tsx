"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Textarea
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import FormButton from "@/components/common/FormButton";

interface PostCreateProps {
  slug: string;
}

const PostCreateForm = ({ slug }: PostCreateProps) => {
  // Bind slug so it's available in createPost server action
  const [formState, formAction] = useFormState(
    actions.createPost.bind(null, slug),
    {
      errors: {}
    }
  );
  const session = useSession();
  const isAuthenticated = !!session?.data?.user;

  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          {isAuthenticated ? <Button color="primary">Create Post</Button> : ""}
        </PopoverTrigger>
        <PopoverContent>
          <form action={formAction}>
            <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Post</h3>
              <Input
                placeholder="Title"
                label="Title"
                labelPlacement="outside"
                name="title"
                errorMessage={formState?.errors?.title?.join(", ")}
                variant="bordered"
                isInvalid={!!formState.errors.title}
              />

              <Textarea
                placeholder=" Content..."
                label="Content"
                labelPlacement="outside"
                name="content"
                errorMessage={formState?.errors?.content?.join(", ")}
                variant="bordered"
                isInvalid={!!formState.errors.content}
              />
              {formState.errors._form && (
                <div className="border border-red-500 bg-red-200 p-3 rounded">
                  <p>{formState.errors._form}</p>
                </div>
              )}
              <FormButton>Create Post</FormButton>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PostCreateForm;
