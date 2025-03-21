import FormControls from "../../../common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { courseLandingPageFormControls } from "../../../../config/index.js";
import { instructorContext } from "../../../../context/instructor-context/index";
import React, { useContext } from "react";

function CourseLanding() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(instructorContext);
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold">
          {" "}
          Course Landing Page
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormControls
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  );
}

export default CourseLanding;
