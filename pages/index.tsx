import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/queryHooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import Head from "next/head";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  const router = useRouter();
  const { locale } = router;
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar locale={locale} movies={movies} />
      <Billboard router={router} locale={locale} />
      <div className="pb-40">
        <MovieList
          title={locale === "en" ? "Trending Now" : "Trendler"}
          data={movies}
          id={"trendings"}
        />
        <MovieList
          title={locale === "en" ? "My List" : "Benim Listem"}
          data={favorites}
          id={"my-list"}
        />
      </div>
      <Footer locale={locale} />
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { locale } = context;
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/${locale}/login`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
