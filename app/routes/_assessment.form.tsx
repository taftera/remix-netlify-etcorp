import { Form, Link, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from "react";
import { requireUserSession } from "~/data/auth.server";
import AssessmentForm from "~/components/assessment/assessment-form";
import {
  characteristicsA,
  characteristicsB,
} from "~/components/assessment/characteristics";
import { addAssessment } from "~/data/assessment.server";
import { getUserAssessment } from "~/data/assessment.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Empowerment Technology Corp | Assessment Tool" },
    { name: "description", content: "Assessment Tool" },
  ];
};

export default function AssesmentTest() {
  const data: any = useLoaderData();
  const [currentStep, setCurrentStep] = useState("A");
  const [resultsA, setResultsA] = useState({});
  const [resultsB, setResultsB] = useState({});

  const handleValueChangeA = (id: any, value: any) => {
    setResultsA((prev) => ({ ...prev, [id]: value }));
    // console.log('Results for Characteristics A:', resultsA);
  };
  const handleValueChangeB = (id: any, value: any) => {
    setResultsB((prev) => ({ ...prev, [id]: value }));
    // console.log('Results for Characteristics B:', resultsB);
  };

  const sumValues = (results: any) => {
    return Object.values(results).reduce(
      (total, value) => total + Number(value),
      0
    );
  };

  const handleNextStep = () => {
    if (currentStep === "A") {
      if (Object.keys(resultsA).length === characteristicsA.length) {
        setCurrentStep("B");
      } else {
        alert("Please complete all assessments in Characteristics A.");
      }
    } else if (currentStep === "B") {
      if (Object.keys(resultsB).length === characteristicsB.length) {
        const totalA: any = sumValues(resultsA);
        const totalB: any = sumValues(resultsB);
        console.log("--- --- --- --- --- | --- --- --- --- ---");
        console.log("Results for Characteristics A:", resultsA);
        console.log("Sum of Characteristics A values:", totalA);
        console.log("Results for Characteristics B:", resultsB);
        console.log("Sum of Characteristics B values:", totalB);
        console.log("--- --- --- --- --- | --- --- --- --- ---");
        document.getElementById("assessment-form").submit();
      } else {
        alert("Please complete all assessments in Characteristics B.");
      }
    }
  };

  console.log("rA:", resultsA);
  console.log("rB:", resultsB);
  // console.log('assessmentTest data: ', data, data.assessment);

  return (
    <>
      {data.assessment == "completed" ? (
        <div
          id="alert"
          className="p-4 bg-red-700 text-white rounded-xl text-center"
        >
          <h3 className="text-xl">You've already completed the test.</h3>
          <span className="text-base mt-8">
            Click <Link to="/result">here</Link> to review your results.
          </span>
        </div>
      ) : (
        <div className="mt-10">
          <div id="instructions" className="font-sans">
            <div className="mb-4 text-primary">
              <h3 className="text-2xl font-semibold mb-2">
                Communication Alchemy
              </h3>
              <h4 className="text-xl mb-2">
                CHARACTERISTICS GROUP {currentStep === "A" && "A"}
                {currentStep === "B" && "B"}
              </h4>
            </div>
            <section className={`bg-secondary p-4 text-primary`}>
              <div className="grid grid-cols-12 gap-2 pb-2">
                <div className="p-4 col-span-6 text-center border border-solid border-black bg-primary text-secondary">
                  I am more this
                </div>
                <div className="p-4 col-span-6 text-center border border-solid border-black bg-primary text-secondary">
                  I am more this
                </div>
              </div>
              <Form method="post" id="assessment-form">
                {currentStep === "A" && (
                  <>
                    <AssessmentForm
                      data={characteristicsA}
                      onValueChange={handleValueChangeA}
                    />
                    <input
                      type="hidden"
                      name="resultsA"
                      value={JSON.stringify(resultsA)}
                    />
                  </>
                )}
                {currentStep === "B" && (
                  <>
                    <AssessmentForm
                      data={characteristicsB}
                      onValueChange={handleValueChangeB}
                    />
                    <input
                      type="hidden"
                      name="resultsB"
                      value={JSON.stringify(resultsB)}
                    />
                  </>
                )}
                <input
                  type="hidden"
                  name="resultsA"
                  value={JSON.stringify(resultsA)}
                />
                <input
                  type="hidden"
                  name="resultsB"
                  value={JSON.stringify(resultsB)}
                />
                <input
                  type="hidden"
                  name="totalsA"
                  value={sumValues(resultsA)}
                />
                <input
                  type="hidden"
                  name="totalsB"
                  value={sumValues(resultsB)}
                />
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-primary hover:bg-primary-50 border-2 border-solid border-primary text-white rounded p-4 mt-8 uppercase"
                    type="button"
                    onClick={handleNextStep}
                  >
                    {currentStep === "A"
                      ? "Next to Characteristics B"
                      : "Submit"}
                  </button>
                </div>
              </Form>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export async function loader({ request }: { request: Request }) {
  // protecting routes with a loader function
  const userId = await requireUserSession(request);
  console.log("loader requireUserSession: ", userId);
  const assessment = await getUserAssessment(userId);
  if (assessment) {
    console.log("has already completed");
    return json({ assessment: "completed" });
  }
  return json(userId);
}

export async function action({ request }: { request: Request }) {
  const userId = await requireUserSession(request);

  const formData = await request.formData();
  const resultsA = formData.get("resultsA");
  const resultsB = formData.get("resultsB");
  const totalA = formData.get("totalsA");
  const totalB = formData.get("totalsB");

  // console.log('--> action: Results of A:', resultsA);
  // console.log('--> action: Results of B:', resultsB);
  // console.log('--> action: Sum of A:', totalA);
  // console.log('--> action: Sum of B:', totalB);

  return await addAssessment(resultsA, resultsB, totalA, totalB, userId);
}
