
import React, { ReactNode } from "react";


const MyApp = ({ Component, pageProps }: any) => {

  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => (
      <div className="proxima bg-white relative">{page}</div>
    ));

  return (
    <>
          {getLayout(<Component {...pageProps} />)}
    </>
  );
};

export default MyApp;
