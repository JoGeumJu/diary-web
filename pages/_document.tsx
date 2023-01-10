import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
      />
      <meta name="description" content="Dev.log" />
      <meta name="keywords" content="blog,react,antd,webpack,css,javascript" />
      <title>My diary-web</title>
      <link rel="shortcut icon" href="/img/notebook.png" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
