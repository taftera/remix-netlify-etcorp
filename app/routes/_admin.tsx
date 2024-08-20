import type { MetaFunction } from '@remix-run/node';
import { Form, Outlet } from '@remix-run/react';
import {
  requireAdminSession,
  adminProfileReview,
  queryAssessments,
} from '~/data/auth.server';
import { json } from '@remix-run/node';
import Header from '~/components/navigation/header';
import Footer from '~/components/navigation/footer';

export const meta: MetaFunction = () => {
  return [
    { title: 'Empowerment Technology Corp | Assessment Tool' },
    { name: 'description', content: 'Assessment Tool' },
  ];
};

export default function AssessmentLayout() {
  return (
    <>
      <Header />
      <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs mx-auto w-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export async function loader({ request }: { request: Request }) {
  // protecting routes with a loader function
  const userId = await requireAdminSession(request);
  console.log('DR loader requireUserSession: ', userId);
  return userId;
}
