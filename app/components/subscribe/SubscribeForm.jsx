import { Form, useNavigation } from '@remix-run/react';

function SubscribeForm(props) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  const {
    email = '',
    first_name = '',
    last_name = '',
    company = '',
    existingUser = '',
  } = props.actionData || {};

  return (
    <>
      {existingUser && (
        <div className="p-4 bg-red-700 rounded text-white text-center mb-8 w-1/2 mx-auto">
          You've already accessed the assessment, if you want to make the
          assessment again please contact Nicole Mercolino.
        </div>
      )}
      <Form
        method="post"
        id="subscribe-form"
        className="p-8 flex flex-col w-fit rounded bg-secondary text-primary m-auto"
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <label className="py-2" htmlFor="first_name">
                First name
              </label>
              <input
                className="border-2 border-solid border-primary rounded p-2 text-stone-600"
                type="text"
                id="first_name"
                name="first_name"
                required
              />
              {first_name && (
                <div
                  id="first_name-error"
                  className="text-base text-white text-center mt-4 bg-red-700 rounded p-4"
                >
                  {first_name}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label className="py-2" htmlFor="last_name">
                Last name
              </label>
              <input
                className="border-2 border-solid border-primary rounded p-2 text-stone-600"
                type="text"
                id="last_name"
                name="last_name"
                required
              />
              {last_name && (
                <div
                  id="last_name-error"
                  className="text-base text-white text-center mt-4 bg-red-700 rounded p-4"
                >
                  {last_name}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="py-2" htmlFor="company">
              Company
            </label>
            <input
              className="border-2 border-solid border-primary rounded p-2 text-stone-600"
              type="text"
              id="company"
              name="company"
              required
            />
            {company && (
              <div
                id="company-error"
                className="text-base text-white text-center mt-4 bg-red-700 rounded p-4"
              >
                {company}
              </div>
            )}
          </div>
          <label className="py-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="border-2 border-solid border-primary rounded p-2 text-stone-600"
            type="email"
            id="email"
            name="email"
            required
          />
          {email && (
            <div
              id="email-error"
              className="text-base text-white text-center mt-4 bg-red-700 rounded p-4"
            >
              {email}
            </div>
          )}
        </div>
        <button
          className="bg-primary hover:bg-primary-50 border-2 border-solid border-primary text-white rounded p-4 mt-8 uppercase"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Authenticating...' : 'Activate'}
        </button>
      </Form>
    </>
  );
}

export default SubscribeForm;
