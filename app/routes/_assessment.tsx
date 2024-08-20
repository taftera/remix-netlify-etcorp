import type { MetaFunction } from '@remix-run/node';
import { Form, Outlet } from '@remix-run/react';
import { getUserFromSession } from '~/data/auth.server';
import Header from '~/components/navigation/header';
import Footer from '~/components/navigation/footer';
import { requireUserSession } from '../data/auth.server';

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
      <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs mx-auto w-full my-8">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export function loader({ request }: { request: Request }) {
  // Creck for valid session cookie.
  return getUserFromSession(request);
}
