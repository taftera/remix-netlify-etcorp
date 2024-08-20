import type { MetaFunction } from '@remix-run/node';
import { requireUserSession } from '~/data/auth.server';
import { json } from '@remix-run/node';
import { useMemo } from 'react';
import { redirect, useLoaderData, Form } from '@remix-run/react';
import { getUserAssessment } from '~/data/assessment.server';
import {
  determineQuadrantAndSubQuadrant,
  quadrantSwitch,
} from '~/components/assessment/quadrant';
// import nodemailer from 'nodemailer';

export const meta: MetaFunction = () => {
  return [
    { title: 'Empowerment Technology Corp | Assessment Tool' },
    { name: 'description', content: 'Assessment Tool' },
  ];
};

export default function AssessmentResult() {
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
  // console.log('AssessmentResult: ', result);

  const quadrantAndSubQuadrant = useMemo(() => {
    return determineQuadrantAndSubQuadrant(result.listA, result.listB);
  }, [result.listA, result.listB]);

  console.log('qAs: ', quadrantAndSubQuadrant);
  let elementQuadrant = quadrantAndSubQuadrant?.quadrant;
  let elementSubquadrant = quadrantAndSubQuadrant?.subQuadrant;
  let colLocation = result.listA - 25 <= 0 ? 0 : result.listA - 25;
  let rowLocation = result.listB - 25 <= 0 ? 0 : result.listB - 25;

  return (
    <div className="font-sans p-4">
      <h2 className="text-2xl text-center mb-8">
        <span className="font-bold mr-2">
          {result.User.first_name} {result.User.last_name}
        </span>
        <span>Results</span>
      </h2>
      <div className="flex flex-row w-5/6 mx-auto">
        <div id="data" className="w-1/2 flex flex-col">
          <div>
            <span className="font-bold mr-2">Email:</span>{' '}
            <span>{result.User.email}</span>
          </div>
          <div>
            <span className="font-bold mr-2">First name:</span>{' '}
            <span>{result.User.first_name}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Last name:</span>{' '}
            <span>{result.User.last_name}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Company:</span>{' '}
            <span>{result.User.company}</span>
          </div>
          <div>
            <span className="font-bold mr-2">X:</span>{' '}
            <span>{result.listA}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Y:</span>{' '}
            <span>{result.listB}</span>
          </div>
        </div>
        <div
          id="results"
          className="border border-stone-600 aspect-square w-1/2 grid grid-cols-75 grid-rows-75"
        >
          <div className="col-start-37 col-end-auto row-start-1 row-end-76 border-r border-stone-600"></div>
          <div className="row-start-37 row-end-auto col-start-1 col-end-76 border-t border-stone-600"></div>
          <div
            // className="col-start-46 row-start-45"
            className={`col-start-${colLocation} col-end-${
              colLocation + 1
            } row-start-${rowLocation} row-end-${rowLocation + 1}`}
            data-coord-x={result.listA}
            data-coord-y={result.listB}
            data-quadrant={elementQuadrant}
            data-subquadrant={elementSubquadrant}
          >
            <div className="relative flex items-center justify-center">
              <span id="quadrant" className="text-7xl">
                {quadrantSwitch(elementQuadrant)}
              </span>
              <span id="subquadrant" className="text-4xl absolute">
                {quadrantSwitch(elementSubquadrant)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }: { request: Request }) {
  const userId = await requireUserSession(request);
  console.log('loader requireUserSession: ', userId);
  const assessment = await getUserAssessment(userId);
  // if (!assessment) {
  //   return redirect('/form');
  // }
  return json(assessment);
}

export async function action({ request }: { request: Request }) {
  const method = request.method;
  // console.log('result method: ', method);
  // if (method === 'PATCH') {
  //   const formData = await request.formData();
  //   const totalA = formData.get('totalA');
  //   const totalB = formData.get('totalB');
  //   const email = formData.get('email');
  //   const message = `X = ${totalA} | Y = ${totalB}`;

  //   // Create a transporter
  //   let transporter = nodemailer.createTransport({
  //     host: 'mail.taftera.dev', // e.g., 'smtp.gmail.com' for Gmail
  //     port: 465, // or 465 for SSL
  //     secure: true, // true for 465, false for other ports
  //     auth: {
  //       user: 'alex@taftera.dev', // process.env.SESSION_USER // Your email
  //       pass: '){1$(261,g[4', // process.env.SESSION_PASS // Your email password
  //     },
  //   });

  //   // Send an email
  //   let info = await transporter.sendMail({
  //     from: '"Alex Turati" <alex@taftera.dev>', // Sender address
  //     to: email, // Recipient address
  //     bcc: '',
  //     subject: 'Your results are in', // Subject line
  //     text: message, // Plain text body
  //     html: `<b>${message}</b>`, // HTML body
  //   });

  //   console.log('Message sent: %s', info.messageId);
  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  //   return null; // or return a response, redirect, etc.
  // }
}
