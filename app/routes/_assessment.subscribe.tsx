import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import SubscribeForm from "~/components/subscribe/SubscribeForm";
import { validateSubscription } from "~/data/validation.server";
import { subscribe } from "~/data/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Empowerment Technology Corp | Assessment Tool" },
    { name: "description", content: "Assessment Tool" },
  ];
};

export default function SubscribePage() {
  const actionData = useActionData();

  return (
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
  );
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
