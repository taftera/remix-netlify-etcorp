import type { MetaFunction } from "@remix-run/node";
import {
  requireUserSession,
  adminProfileReview,
  queryAssessments,
} from "~/data/auth.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import ReviewBlock from "~/components/reviews/review-block";

export const meta: MetaFunction = () => {
  return [
    { title: "Empowerment Technology Corp | Assessment Tool" },
    { name: "description", content: "Assessment Tool" },
  ];
};

export default function DataReview() {
  const allAssessments: {
    id: string;
    listA: number;
    listB: number;
    dateAdded: string;
    userId: string;
    User: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      company: string;
    };
  } = useLoaderData();
  const assessments = useMemo(() => allAssessments, [allAssessments]);

  return (
    <div className="my-10">
      <div className="mb-4 text-primary">
        <h3 className="text-2xl mb-2">Data Review</h3>
      </div>
      <div className="overflow-auto">
        <div className="p-4 grid grid-cols-review bg-primary text-secondary min-w-fit">
          <div className="text-center">Link</div>
          <div className="text-center">Date</div>
          <div className="text-center">First Name</div>
          <div className="text-center">Last Name</div>
          <div className="text-center">Email</div>
          <div className="text-center">Group/Company</div>
          <div className="text-center">CharA(x) Score</div>
          <div className="text-center">Primary Style</div>
          <div className="text-center">CharB(y) Score</div>
          <div className="text-center">Secondary Style</div>
        </div>
        {assessments.map((data) => (
          <ReviewBlock key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}

export async function loader({ request }: { request: Request }) {
  // protecting routes with a loader function
  const userId = await requireUserSession(request);
  console.log("DR loader requireUserSession: ", userId);
  const enabledProfile = await adminProfileReview(userId);
  console.log("DR loader adminProfileReview: ", enabledProfile);
  if (enabledProfile) {
    const assessments = await queryAssessments();
    return json(assessments);
  }
  return null;
}
