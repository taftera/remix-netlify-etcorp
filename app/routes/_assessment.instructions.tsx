import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { FaArrowRight } from 'react-icons/fa';

export const meta: MetaFunction = () => {
  return [
    { title: 'Empowerment Technology Corp | Assessment Tool' },
    { name: 'description', content: 'Assessment Tool' },
  ];
};

export default function AssesmentTest() {
  return (
    <div className="mt-10">
      <div id="instructions" className="font-sans text-primary">
        <div className="mb-4 text-primary">
          <h3 className="text-2xl font-semibold mb-2">Communication Alchemy</h3>
          <h4 className="text-xl mb-2">PARTICIPANT SELF-ANALYSIS ASSESSMENT</h4>
          <p>
            Completing the following self-assessment is essential to your
            participation in the program.
          </p>
        </div>
        <div className="mb-4 text-primary">
          <h4 className="text-xl mb-2">INSTRUCTIONS:</h4>
          <p className="mb-2">
            The assessment includes two characteristic groupings. Each group
            includes a word parining for you to consider what feels most like
            you. In some cases you may feel that you relate to both, that is OK!
            We are asking in this case to choose the characteristic that is MORE
            like you over the other - even it’s only a slight difference.
          </p>
          <p className="mb-2">
            This works best when you are free from worry about whether your
            answer is right or wrong. No one will see your assessment
            selections.
          </p>
          <p className="mb-2">
            Take your time. Contemplate each word pairing, and note that these
            pairings are not always opposites.
          </p>
          <p className="mb-2">
            Have fun with this.{' '}
            <span className="font-semibold">THERE ARE NO WRONG ANSWERS!</span>
          </p>
        </div>
        <div className="mb-8 flex justify-center">
          <Link
            to={'/characteristics'}
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
