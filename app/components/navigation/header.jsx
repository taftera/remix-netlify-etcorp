import { Form, Link, NavLink, useLoaderData } from '@remix-run/react';

function Header() {
  const userId = useLoaderData();
  const enableMenu = userId?.userId && userId?.admin;

  return (
    <header id="main-header" className="px-4 py-2 bg-secondary max-h-20">
      <div className="flex flex-row justify-between xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs mx-auto w-full">
        <Link to="/">
          <img
            src="/images/ETC-Squared.png"
            alt="Empowerment Technology Corporation"
            className="w-24 border-2 border-solid border-secondary"
          />
        </Link>
        <nav>
          <ul className="flex h-16 items-center">
            <li>
              {enableMenu && (
                <Form method="post" action="/logout" id="logout-form">
                  <button className="text-primary hover:underline underline-offset-1">
                    Logout
                  </button>
                </Form>
              )}
              {!enableMenu && (
                <NavLink
                  to="/auth?mode=login"
                  className="text-primary hover:underline underline-offset-1"
                >
                  Admin Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
// TODO: find a way to certify admin for menu
/*

      {userId && (
        <nav id="main-nav">
          <ul className="flex flex-row gap-4">
            <li>
              <NavLink
                to="/form"
                className="hover:underline underline-offset-1"
              >
                Form
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/result"
                className="hover:underline underline-offset-1"
              >
                Result
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
*/
