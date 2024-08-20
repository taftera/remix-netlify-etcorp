import type { MetaFunction } from '@remix-run/node';
import { requireUserSession } from '~/data/auth.server';
import { json } from '@remix-run/node';
import { useMemo } from 'react';
import { getUserAssessment } from '~/data/assessment.server';
import { redirect, Link, useLoaderData } from '@remix-run/react';
import {
  determineQuadrantAndSubQuadrant,
  quadrantSwitch,
} from '~/components/assessment/quadrant';

export const meta: MetaFunction = () => {
  return [
    { title: 'Empowerment Technology Corp | Assessment Tool' },
    { name: 'description', content: 'Assessment Tool' },
  ];
};

export default function AssessmentEnd() {
  const result: {
    id: string;
    listA: number;
    listB: number;
    dateAdded: string;
    userId: string;
    User: {
      email: string;
      first_name: string;
      last_name: string;
      company: string;
    };
  } = useLoaderData();

  const quadrantAndSubQuadrant = useMemo(() => {
    return determineQuadrantAndSubQuadrant(result.listA, result.listB);
  }, [result.listA, result.listB]);

  let elementQuadrant = quadrantAndSubQuadrant?.quadrant;
  let elementSubquadrant = quadrantAndSubQuadrant?.subQuadrant;

  return (
    <>
      <div className="mt-10">
        <div id="congratulations" className="font-sans text-primary">
          <div className="mb-4 text-primary">
            <h3 className="text-2xl mb-2">
              You did it! Assessment is complete.
            </h3>
            <div className="my-8 px-20">
              <h4 className="text-xl mb-4">
                Your communication alchemy is:{' '}
                <span className="font-bold">
                  {quadrantSwitch(elementQuadrant)}
                </span>
              </h4>
              <p className="mb-4">
                Thank you for taking the time to participate in this first step
                towards excellence in developing greater self-awareness in your
                unique communication style and the styles of others!
              </p>
              <h5 className="text-lg font-bold">See you on training day!</h5>
              <h5 className="text-lg font-bold">Nicole & Paulette</h5>
            </div>
          </div>
          <div className="mb-8 flex justify-center">
            <Link
              to={'/end'}
              className="bg-primary hover:bg-primary-50 border-2 border-solid border-primary text-white rounded p-4 mt-8 uppercase flex flex-row gap-4 items-center w-fit"
            >
              Submit your results
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader({ request }: { request: Request }) {
  const userId = await requireUserSession(request);
  console.log('loader requireUserSession: ', userId);
  const assessment = await getUserAssessment(userId);
  if (!assessment) {
    return redirect('/instructions');
  }
  return json(assessment);
}
