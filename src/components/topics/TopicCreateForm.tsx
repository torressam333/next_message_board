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

const TopicCreateForm = () => {
  const [formState, formAction] = useFormState(actions.createTopic, {
    errors: {}
  });

  const session = useSession();
  const isAuthenticated = !!session?.data?.user;

  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          {isAuthenticated && <Button color="primary">Create Topic</Button>}
        </PopoverTrigger>
        <PopoverContent>
          <form action={formAction}>
            <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input
                placeholder="Name"
                label="Name"
                labelPlacement="outside"
                name="name"
                errorMessage={formState?.errors?.name?.join(", ")}
                variant="bordered"
                isInvalid={!!formState.errors.name}
              />

              <Textarea
                placeholder=" Describe topic..."
                label="Description"
                labelPlacement="outside"
                name="description"
                errorMessage={formState?.errors?.description?.join(", ")}
                variant="bordered"
                isInvalid={!!formState.errors.description}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TopicCreateForm;
