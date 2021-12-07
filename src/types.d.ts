import type { NextPage } from "next";

type GetLayout = (page: ReactNode) => ReactNode;

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

export type AppLayoutProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};
export type DashboardPage<P = { user: User }, IP = P> = Page<P, IP>;
