import { Link, useRouteError } from "react-router-dom";
import img from "../../assets/not-found.svg";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className="min-h-screen text-center flex items-center justify-center">
        <div>
          <img
            src={img}
            alt="not found"
            className="max-w-[600px] block mb-8 -mt-12"
          />
          <h3 className="mb-2  capitalize text-xl  text-pink-500">
            Page not found
          </h3>
          <p className="leading-6 mt-2 mb-4 text-gray-500">
            Sorry! We can't find the page you're looking for.
          </p>
          <Link to="/" className="underline capitalize text-sky-500">
            back home
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen text-center flex items-center justify-center">
      <div>
        <h3 className="mb-2 capitalize">something went wrong</h3>
      </div>
    </main>
  );
};
export default Error;
