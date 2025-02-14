import React from "react";
import { Button } from "../ui/button";
import FormControls from "./form-controls";

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls  */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 transition-all">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
