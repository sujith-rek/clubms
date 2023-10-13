import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { user } = router.query;
  const parsedUser = JSON.parse(user);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
          Profile
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={parsedUser.name}
                disabled
                className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={parsedUser.email}
                disabled
                className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="desc"
                name="desc"
                type="text"
                autoComplete="desc"
                required
                value={parsedUser.desc}
                disabled
                rows="3"
                className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}