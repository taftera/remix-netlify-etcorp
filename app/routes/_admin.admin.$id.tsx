import { useParams } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useMemo } from "react";
import { useLoaderData } from "@remix-run/react";
import { getAssessment } from "~/data/assessment.server";
import {
  determineQuadrantAndSubQuadrant,
  quadrantSwitch,
} from "~/components/assessment/quadrant";
import { Link } from "@remix-run/react";
import { FaArrowRight } from "react-icons/fa";
import {
  characteristicsA,
  characteristicsB,
} from "~/components/assessment/characteristics";

export const meta: MetaFunction = () => {
  return [
    { title: "Empowerment Technology Corp | Assessment Tool" },
    { name: "description", content: "Assessment Tool" },
  ];
};
export default function ReviewId() {
  const { id } = useParams();
  type ResultData = {
    key1: string;
    key2: number;
    // other properties...
  };
  const result: {
    id: string;
    listA: number;
    listB: number;
    resultsA: ResultData;
    resultsB: ResultData;
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
  let colLocation = result.listA - 25 <= 0 ? 0 : result.listA - 25;
  let rowLocation = result.listB - 25 <= 0 ? 0 : result.listB - 25;

  let locationStyles = `col-start-${colLocation} col-end-${
    colLocation + 1
  } row-start-${rowLocation} row-end-${rowLocation + 1}`;

  // characteristicsA.map((items, index) => {
  //   console.log(items[0], result.resultsA[index], items[1]);
  // });
  // characteristicsB.map((items, index) => {
  //   console.log(items[0], result.resultsB[index], items[1]);
  // });

  return (
    <>
      <div className="mt-10">
        <div className="flex justify-end">
          <Link
            className="bg-primary hover:bg-primary-50 border-2 border-solid border-primary text-white rounded p-2 mt-8 uppercase flex flex-row gap-4 items-center"
            to="/admin/dataReview"
          >
            <span>Return</span>
            <FaArrowRight />
          </Link>
        </div>
        <div id={`review-${id}`} className="font-sans text-primary">
          <div className="font-sans p-4">
            <h2 className="text-2xl text-center mb-8">
              <span className="font-bold mr-2">
                {result.User.first_name} {result.User.last_name}
              </span>
              <span>Results</span>
            </h2>
            <div className="flex flex-col md:flex-row w-5/6 mx-auto">
              <div id="data" className="flex flex-col flex-1 mb-8">
                <div>
                  <span className="font-bold mr-2">Email:</span>{" "}
                  <span>{result.User.email}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">First name:</span>{" "}
                  <span>{result.User.first_name}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Last name:</span>{" "}
                  <span>{result.User.last_name}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Company:</span>{" "}
                  <span>{result.User.company}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">X:</span>{" "}
                  <span>{result.listA}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Y:</span>{" "}
                  <span>{result.listB}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Main Element:</span>{" "}
                  <span>{quadrantSwitch(elementQuadrant)}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Secondary Element:</span>{" "}
                  <span>{quadrantSwitch(elementSubquadrant)}</span>
                </div>
              </div>
              <div
                id="results"
                className="border border-primary aspect-square flex-1 grid grid-cols-75 grid-rows-75"
              >
                <div className="col-start-37 col-end-auto row-start-1 row-end-76 border-r border-primary"></div>
                <div className="row-start-37 row-end-auto col-start-1 col-end-76 border-t border-primary"></div>
                <div
                  className={`bg-red-500 ${locationStyles}`}
                  data-coord-x={result.listA}
                  data-coord-y={result.listB}
                  data-quadrant={elementQuadrant}
                  data-subquadrant={elementSubquadrant}
                ></div>
                <div className="hidden col-start-14 col-end-14 row-start-14 row-end-14 col-start-15 col-end-15 row-start-15 row-end-15 col-start-16 col-end-16 row-start-16 row-end-16 col-start-17 col-end-17 row-start-17 row-end-17 col-start-18 col-end-18 row-start-18 row-end-18 col-start-19 col-end-19 row-start-19 row-end-19 col-start-20 col-end-20 row-start-20 row-end-20 col-start-21 col-end-21 row-start-21 row-end-21 col-start-22 col-end-22 row-start-22 row-end-22 col-start-23 col-end-23 row-start-23 row-end-23 col-start-24 col-end-24 row-start-24 row-end-24 col-start-25 col-end-25 row-start-25 row-end-25 col-start-26 col-end-26 row-start-26 row-end-26 col-start-27 col-end-27 row-start-27 row-end-27 col-start-28 col-end-28 row-start-28 row-end-28 col-start-29 col-end-29 row-start-29 row-end-29 col-start-30 col-end-30 row-start-30 row-end-30 col-start-31 col-end-31 row-start-31 row-end-31 col-start-32 col-end-32 row-start-32 row-end-32 col-start-33 col-end-33 row-start-33 row-end-33 col-start-34 col-end-34 row-start-34 row-end-34 col-start-35 col-end-35 row-start-35 row-end-35 col-start-36 col-end-36 row-start-36 row-end-36 col-start-37 col-end-37 row-start-37 row-end-37 col-start-38 col-end-38 row-start-38 row-end-38 col-start-39 col-end-39 row-start-39 row-end-39 col-start-40 col-end-40 row-start-40 row-end-40 col-start-41 col-end-41 row-start-41 row-end-41 col-start-42 col-end-42 row-start-42 row-end-42 col-start-43 col-end-43 row-start-43 row-end-43 col-start-44 col-end-44 row-start-44 row-end-44 col-start-45 col-end-45 row-start-45 row-end-45 col-start-46 col-end-46 row-start-46 row-end-46 col-start-47 col-end-47 row-start-47 row-end-47 col-start-48 col-end-48 row-start-48 row-end-48 col-start-49 col-end-49 row-start-49 row-end-49 col-start-50 col-end-50 row-start-50 row-end-50 col-start-51 col-end-51 row-start-51 row-end-51 col-start-52 col-end-52 row-start-52 row-end-52 col-start-53 col-end-53 row-start-53 row-end-53 col-start-54 col-end-54 row-start-54 row-end-54 col-start-55 col-end-55 row-start-55 row-end-55 col-start-56 col-end-56 row-start-56 row-end-56 col-start-57 col-end-57 row-start-57 row-end-57 col-start-58 col-end-58 row-start-58 row-end-58 col-start-59 col-end-59 row-start-59 row-end-59 col-start-60 col-end-60 row-start-60 row-end-60 col-start-61 col-end-61 row-start-61 row-end-61 col-start-62 col-end-62 row-start-62 row-end-62 col-start-63 col-end-63 row-start-63 row-end-63 col-start-64 col-end-64 row-start-64 row-end-64 col-start-65 col-end-65 row-start-65 row-end-65 col-start-66 col-end-66 row-start-66 row-end-66 col-start-67 col-end-67 row-start-67 row-end-67 col-start-68 col-end-68 row-start-68 row-end-68 col-start-69 col-end-69 row-start-69 row-end-69 col-start-70 col-end-70 row-start-70 row-end-70 col-start-71 col-end-71 row-start-71 row-end-71 col-start-72 col-end-72 row-start-72 row-end-72 col-start-73 col-end-73 row-start-73 row-end-73 col-start-74 col-end-74 row-start-74 row-end-74 col-start-75 col-end-75 row-start-75 row-end-75 col-start-76 col-end-76 row-start-76 row-end-76 col-start-77 col-end-77 row-start-77 row-end-77 col-start-78 col-end-78 row-start-78 row-end-78 col-start-79 col-end-79 row-start-79 row-end-79 col-start-80 col-end-80 row-start-80 row-end-80 col-start-81 col-end-81 row-start-81 row-end-81 col-start-82 col-end-82 row-start-82 row-end-82 col-start-83 col-end-83 row-start-83 row-end-83 col-start-84 col-end-84 row-start-84 row-end-84 col-start-85 col-end-85 row-start-85 row-end-85 col-start-86 col-end-86 row-start-86 row-end-86 col-start-87 col-end-87 row-start-87 row-end-87 col-start-88 col-end-88 row-start-88 row-end-88 col-start-89 col-end-89 row-start-89 row-end-89 col-start-90 col-end-90 row-start-90 row-end-90 col-start-91 col-end-91 row-start-91 row-end-91 col-start-92 col-end-92 row-start-92 row-end-92 col-start-93 col-end-93 row-start-93 row-end-93 col-start-94 col-end-94 row-start-94 row-end-94 col-start-95 col-end-95 row-start-95 row-end-95 col-start-96 col-end-96 row-start-96 row-end-96 col-start-97 col-end-97 row-start-97 row-end-97 col-start-98 col-end-98 row-start-98 row-end-98 col-start-99 col-end-99 row-start-99 row-end-99 col-start-10 col-end-100 row-start-100 row-end-100 ">
                  tailwind errors
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row my-8 mx-auto gap-4">
              <div className="flex flex-col flex-1">
                <h3 className="text-xl mb-4 font-bold text-center">
                  Characterists A
                </h3>
                {characteristicsA.map((item, index) => (
                  <div
                    key={`ca-${index}`}
                    className="w-full grid grid-cols-11 items-center border-t border-solid border-secondary last:border-b"
                  >
                    <span className="col-span-5 text-left">{item[0]}</span>
                    <span className="text-center">
                      {result.resultsA[index]}
                    </span>
                    <span className="col-span-5 text-right">{item[1]}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-xl mb-4 font-bold text-center">
                  Characterists B
                </h3>
                {characteristicsB.map((item, index) => (
                  <div
                    key={`cb-${index}`}
                    className="w-full grid grid-cols-11 items-center border-t border-solid border-secondary last:border-b"
                  >
                    <span className="col-span-5 text-left">{item[0]}</span>
                    <span className="text-center">
                      {result.resultsB[index]}
                    </span>
                    <span className="col-span-5 text-right">{item[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader({
  params,
  request,
}: {
  params: { id: string };
  request: Request;
}) {
  console.log("id: ", params.id);
  const { id } = params;
  const assessment = await getAssessment(id);
  // console.log('getUserAssessment:id: ', assessment);
  // get user ID
  // get query from this data
  return json(assessment);
}
