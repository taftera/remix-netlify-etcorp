import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { FaArrowRight } from 'react-icons/fa';
import AssessmentModule from '~/components/assessment/assessment-module';

export const meta: MetaFunction = () => {
  return [
    { title: 'Empowerment Technology Corp | Assessment Tool' },
    { name: 'description', content: 'Assessment Tool' },
  ];
};

const dummyChange = (event) => {
  return null;
};

export default function AssesmentTest() {
  return (
    <div className="mt-10">
      <div id="instructions" className="font-sans text-primary">
        <div className="mb-4 text-primary">
          <h3 className="text-2xl font-semibold mb-2">Communication Alchemy</h3>
          <h4 className="text-xl mb-2">CHARACTERISTICS GROUP A</h4>
          <div className="mb-4">
            <p>Review each word pairing.</p>
            <p>Ask yourself is “Am I more this? or Am I more that?”</p>
          </div>
          <div className="mb-4">
            <p>
              If you are <span className="font-semibold">ALOT</span> more of one
              characteristic over the other, choose the number closest to the
              word.
            </p>
            <p>
              If you are <span className="font-semibold">SOMEWHAT</span> more of
              one characteristic over the other the number closest to the
              middle.
            </p>
          </div>
        </div>
        <div className="mb-4 text-primary">
          <h4 className="text-xl mb-2">For example:</h4>
          <div className="my-8 bg-secondary">
            <div className="grid grid-cols-12 gap-2 pb-2">
              <div className="p-4 col-span-6 text-center border border-solid border-black bg-primary text-secondary">
                I am more this
              </div>
              <div className="p-4 col-span-6 text-center border border-solid border-black bg-primary text-secondary">
                I am more this
              </div>
            </div>
            <AssessmentModule
              key={1}
              id={1}
              primary={'Initiating'}
              secondary={'Yielding'}
              onValueChange={dummyChange}
            />
          </div>
          <div className="mb-4">
            <p>
              If you are Alot more Initiating than Yeilding you would select{' '}
              <span className="font-semibold">1</span>
            </p>
            <p>
              If you are Somewhat more Initiating than Yeilding you would select{' '}
              <span className="font-semibold">2</span>
            </p>
            <p>
              If you are Somewhat more Yeilding than Initiating you would select{' '}
              <span className="font-semibold">3</span>
            </p>
            <p>
              If you are Alot more Yeiliding than initiating you would select{' '}
              <span className="font-semibold">4</span>
            </p>
          </div>
        </div>
        <div className="mb-8 flex justify-center">
          <Link
            to={'/form'}
            className="bg-primary hover:bg-primary-50 border-2 border-solid border-primary text-white rounded p-4 mt-8 uppercase flex flex-row gap-4 items-center w-fit"
          >
            <span>Continue</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }: { request: Request }) {
  // protecting routes with a loader function
  return null;
}

export async function action({ request }: { request: Request }) {
  return null;
}
