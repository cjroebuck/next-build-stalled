import Router from "next/router";
// import { NextPageContext } from 'next';

export const redirectTo = (url: any, as?: any, context?: any) => {
  let location = as || url;

  if (context && context.res) {
    context.res
      .writeHead(302, {
        Location: location,
      })
      .end();
  } else {
    if (url.startsWith("/")) {
      Router.push(url, as);
    } else {
      window.location.href = location;
    }
  }
};
