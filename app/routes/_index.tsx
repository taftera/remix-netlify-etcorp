import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getUserFromSession } from "~/data/auth.server";
import Header from "~/components/navigation/header";
import Footer from "~/components/navigation/footer";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import SubscribeForm from "~/components/subscribe/SubscribeForm";
import { validateSubscription } from "~/data/validation.server";
import { subscribe, prismaTest } from "~/data/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Empowerment Technology Corp | Assessment Tool" },
    { name: "description", content: "Assessment Tool" },
  ];
};

export default function Index() {
  const actionData = useActionData();
  return (
    <>
      <Header />
      <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs mx-auto w-full my-8">
        <div className="mt-10">
          <div className="mb-4 text-primary">
            <h3 className="text-2xl font-semibold mb-8">
              Welcome to Communication Alchemy
            </h3>
            <p>
              Integrating communication insights and self-awareness for greater
              leadership and success.
            </p>
            <p>
              You have been invited to join your team for a day of training and
              development. The event will be engaging, fun, and collaborative!
            </p>
          </div>
          <div className="mb-4 text-primary">
            <h4 className="text-xl mb-8">
              Activate Your Assessment{" "}
              <span className="text-base">(*required fields)</span>
            </h4>
          </div>
          <SubscribeForm actionData={actionData} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export function loader({ request }: { request: Request }) {
  // Creck for valid session cookie.
  return getUserFromSession(request);
  // try {
  //   const prisma_test = prismaTest("a.turati@gmail.com");
  //   return prisma_test;
  // } catch (error) {
  //   return error;
  // }
  // const object_test = {
  //   id: "66c3fe5d57d213aad889919f",
  //   email: "a.turati@gmail.com",
  //   password:
  //     "$argon2id$v=19$m=65536,t=3,p=4$fInLWXAmJEqYviZQXDv4vw$erxpSbBnu5ZLzm+JToYAW2zWxAddq8+3cIxhqaVcUX0",
  //   first_name: "Alex",
  //   last_name: "Turati",
  //   company: "taftera",
  //   admin: true,
  // };
  // return JSON.stringify(object_test);
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const subscribeData = Object.fromEntries(formData);

  console.log("subscribeData: ", subscribeData);
  // Validate user input
  try {
    validateSubscription(subscribeData);
  } catch (validationErrors) {
    console.log("subscribe faction:ve: ", validationErrors);
    return json(validationErrors);
  }
  console.log("data validation complete, subscribing...");
  // If successful, handle subscription logic here
  try {
    return await subscribe(subscribeData);
  } catch (error: any) {
    return json(error);
  }

  return null;
}
