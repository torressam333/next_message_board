import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Textarea
} from "@nextui-org/react";

const TopicCreateForm = () => {
  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form>
            <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input placeholder="Name" label="Name" labelPlacement="outside" />
              <Textarea
                placeholder=" Describe topic..."
                label="Description"
                labelPlacement="outside"
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
