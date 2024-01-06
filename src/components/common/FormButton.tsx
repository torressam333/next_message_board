"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

const FormButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Add
    </Button>
  );
};

export default FormButton;
