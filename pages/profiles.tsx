import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import Head from "next/head";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Profiles = () => {
  const router = useRouter();
  const { locale } = router;
  const { data: user } = useCurrentUser();
  const { isLoading: isLoading } = useCurrentUser();
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center h-full justify-center">
        <h2
          className="absolute top-0 left-2 mt-4 text-white hover:text-gray-500 transition cursor-pointer duration-700"
          onClick={() => {
            signOut();
          }}
        >
          {" "}
          {locale === "en" ? "← Sign Out" : "← Çıkış Yap"}
        </h2>

        <div className="flex flex-col ">
          <h1 className="text-3xl text-white text-center">
            {locale === "en" ? "Who is watching?" : "Kim izliyor?"}
          </h1>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div
              onClick={() => {
                router.push(locale === "en" ? "/" : "/tr/");
              }}
            >
              <div className="group flex-row w-44 mx-auto">
                <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                  {isLoading ? (
                    <img
                      alt="Profile"
                      className="w-full h-full"
                      src="/images/default-green.png"
                    />
                  ) : (
                    <img
                      src={user?.image}
                      alt="Profile"
                      className="w-full h-full"
                    />
                  )}
                </div>
                {isLoading ? (
                  <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white ">
                    ...
                  </div>
                ) : (
                  <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white ">
                    {user?.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profiles;
