import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Provider } from '@supabase/gotrue-js';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import styles from './login.module.css';

const Login: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const provider = e.currentTarget.dataset.provider as Provider;
    setLoading(true);

    const { protocol, host } = window.location;
    const { user, session, error } = await supabaseClient.auth.signIn(
      { provider },
      {
        redirectTo: `${protocol}//${host}`,
      }
    );
    console.log('-->', user, session, error);
  };

  return (
    <>
      {/*
          This example requires updating your template:

          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
      <div className={`${styles['login-page']} flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-20 w-auto" src="/logo.svg" alt="rollouts" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p> */}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <button
                    onClick={handleSignIn}
                    data-provider="github"
                    disabled={loading}
                    className={`${styles.a} inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50`}
                  >
                    <svg
                      className={`${styles['octo-logo']} h-5 w-5`}
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="flex-1 text-center">Sign in with GitHub</span>
                    <div className="w-5"></div>
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleSignIn}
                    data-provider="gitlab"
                    disabled={loading}
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <svg
                      className={`${styles['tanuki-logo']} h-5 w-5`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g transform="matrix(0.963128,0,0,0.963128,-0.00209661,0.442513)">
                        <path
                          d="M24.507,9.5L24.473,9.41L21.082,0.562C20.946,0.223 20.616,-0 20.25,-0C19.85,-0 19.496,0.268 19.388,0.653L17.098,7.663L7.825,7.663L5.535,0.653C5.424,0.27 5.071,0.004 4.672,0.004C4.308,0.004 3.979,0.226 3.841,0.563L0.451,9.411L0.416,9.5C-0.584,12.113 0.272,15.094 2.506,16.778L2.518,16.788L2.548,16.81L7.708,20.677L10.268,22.612L11.822,23.788C12.196,24.071 12.716,24.071 13.09,23.788L14.645,22.612L17.205,20.677L22.402,16.787L22.416,16.777C24.65,15.093 25.506,12.113 24.507,9.5Z"
                          // fill="#E24329"
                        />
                      </g>
                      <g transform="matrix(0.963128,0,0,0.963128,-0.00209661,0.442513)">
                        <path
                          d="M24.507,9.5L24.473,9.41C22.82,9.749 21.263,10.45 19.913,11.461L12.466,17.093L17.208,20.677L22.405,16.787L22.419,16.777C24.652,15.092 25.507,12.112 24.507,9.5Z"
                          // fill="#FC6D26"
                        />
                      </g>
                      <g transform="matrix(0.963128,0,0,0.963128,-0.00209661,0.442513)">
                        <path
                          d="M7.707,20.677L10.267,22.612L11.822,23.788C12.196,24.071 12.716,24.071 13.09,23.788L14.645,22.612L17.205,20.677L12.462,17.093L7.707,20.677Z"
                          // fill="#FCA326"
                        />
                      </g>
                      <g transform="matrix(0.963128,0,0,0.963128,-0.00209661,0.442513)">
                        <path
                          d="M5.01,11.461C3.66,10.45 2.103,9.749 0.45,9.411L0.416,9.5C-0.584,12.113 0.272,15.094 2.506,16.778L2.518,16.788L2.548,16.81L7.708,20.677L12.453,17.093L5.009,11.461L5.01,11.461Z"
                          // fill="#FC6D26"
                        />
                      </g>
                    </svg>

                    <span className="flex-1 text-center text-gray-500">Sign in with GitLab</span>
                    <div className="w-5"></div>
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleSignIn}
                    data-provider="google"
                    disabled={loading}
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <svg
                      className={`${styles['google-logo']} h-5 w-5`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path
                          // fill="#4285F4"
                          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                        />
                        <path
                          // fill="#34A853"
                          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                        />
                        <path
                          // fill="#FBBC05"
                          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                        />
                        <path
                          // fill="#EA4335"
                          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                        />
                      </g>
                    </svg>

                    <span className="flex-1 text-center">Sign in with Google</span>
                    <div className="w-5"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
