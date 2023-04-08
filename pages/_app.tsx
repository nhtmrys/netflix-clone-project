import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {SessionProvider} from 'next-auth/react';

const queryClient = new QueryClient();
export default function App({
                                Component, pageProps: {
        session,
        ...pageProps
    }
                            }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
            <ReactQueryDevtools initialIsOpen={true}/>
        </QueryClientProvider>
    );
}
