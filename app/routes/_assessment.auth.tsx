import type { MetaFunction } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { login, signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import { FaLock, FaUserPlus } from "react-icons/fa";

export const meta: MetaFunction = () => {
  return [
    { title: "Empowerment Technology Corp | Assessment Tool" },
    { name: "description", content: "Assessment Tool" },
  ];
};

export default function AuthPage() {
  return (
    <>
      <AuthForm />
    </>
  );
}

export async function action({ request }: { request: Request }) {
  const url = new URL(request.url).searchParams;
  const authMode = url.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  console.log("credentials: ", credentials);
  // Validate user input
  try {
    validateCredentials(credentials);
    console.log("successfully validated credentials");
  } catch (error) {
    return error;
  }
  try {
    if (authMode === "login") {
      console.log("await login");
      return await login(credentials);
    } else {
      console.log("await signup");
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422) {
      return new Response(error.message, { status: 422 });
    }
  }
  return null;
}
