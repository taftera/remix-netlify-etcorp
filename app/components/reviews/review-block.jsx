import { Link } from '@remix-run/react';
import {
  determineQuadrantAndSubQuadrant,
  quadrantSwitch,
} from '../assessment/quadrant';

function ReviewBlock({ data }) {
  const quadrantAndSubQuadrant = determineQuadrantAndSubQuadrant(
    data.listA,
    data.listB
  );

  let elementQuadrant = quadrantAndSubQuadrant?.quadrant;
  let elementSubquadrant = quadrantAndSubQuadrant?.subQuadrant;

  const date = new Date(data.dateAdded).toISOString().split('T')[0];
  return (
    <div className="py-2 px-4 grid grid-cols-review bg-secondary text-primary min-w-fit hover:bg-secondary-50 hover:font-semibold">
      <div className="text-center text-sm overflow-hidden">
        <Link
          className="hover:underline underline-offset-1"
          to={`/admin/${data.id}`}
        >
          Review
        </Link>
      </div>
      <div className="text-center text-sm overflow-hidden">{date}</div>
      <div className="text-center text-sm overflow-hidden">
        {data.User.first_name}
      </div>
      <div className="text-center text-sm overflow-hidden">
        {data.User.last_name}
      </div>
      <div className="text-center text-sm overflow-hidden">
        {data.User.email}
      </div>
      <div className="text-center text-sm overflow-hidden">
        {data.User.company}
      </div>
      <div className="text-center text-sm overflow-hidden">{data.listA}</div>
      <div className="text-center text-sm overflow-hidden">
        {quadrantSwitch(elementQuadrant)}
      </div>
      <div className="text-center text-sm overflow-hidden">{data.listB}</div>
      <div className="text-center text-sm overflow-hidden">
        {quadrantSwitch(elementSubquadrant)}
      </div>
    </div>
  );
}

export default ReviewBlock;
