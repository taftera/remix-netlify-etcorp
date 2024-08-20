import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  // useSubmit,
  useNavigation,
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  const [searchParams] = useSearchParams(); //, setSearchParams
  const navigation = useNavigation();
  const validationErrors = useActionData();

  const authMode = searchParams.get('mode') || 'login';
  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
  const toggleBtnCaption =
    authMode === 'login' ? 'Create a new user' : 'Login with existing user';

  const isSubmitting = navigation.state !== 'idle';

  return (
    <Form
      method="post"
      className="p-8 flex flex-col w-1/2 rounded-xl bg-primary text-white m-auto"
      id="auth-form"
      // onSubmit={submitHandler}
    >
      <div className="p-4 bg-secondary w-fit rounded-full mx-auto text-primary text-2xl">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <div className="flex flex-col py-4">
        <label className="pb-2" htmlFor="email">
          Email Address
        </label>
        <input
          className="border-2 border-solid border-secondary rounded-xl p-2 text-stone-600"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div className="flex flex-col py-4">
        <label className="pb-2" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 border-solid border-secondary rounded-xl p-2 text-stone-600"
          type="password"
          id="password"
          name="password"
          minLength={7}
        />
      </div>
      {/* {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )} */}
      {validationErrors && <i>{validationErrors}</i>}
      <div id="form-actions" className="flex flex-col py-4 text-center">
        <button
          className="bg-red-700 hover:bg-orange-600 text-white rounded-xl p-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Authenticating...' : submitBtnCaption}
        </button>
        <Link
          className="pt-4 hover:underline underline-offset-4"
          to={authMode === 'login' ? '?mode=signup' : '?mode=login'}
        >
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
