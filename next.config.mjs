// import * as path from "path";
// const { withContentlayer } = require("next-contentlayer");

import withTM from "next-transpile-modules";
// "d3-time-format", // The package I'm trying to import
// "delaunator", // A dependency of d3-delaunay
// "robust-predicates", // A dependency of delaunator
// "bail",
// "comma-separated-tokens",
// "hast-to-hyperscript",
// "hast-util-from-parse5",
// "hast-util-has-property",
// "hast-util-heading-rank",
// "hast-util-parse-selector",
// "hast-util-raw",
// "hast-util-sanitize",
// "hast-util-to-parse5",
// "hast-util-to-string",
// "hastscript",
// "html-void-elements",
// "is-plain-obj",
// "mdast-util-from-markdown",
// "micromark-core-commonmark",
// "micromark-factory-destination",
// "micromark-factory-label",
// "micromark-factory-space",
// "micromark-factory-title",
// "micromark-factory-whitespace",
// "micromark-util-combine-extensions",
// "micromark-util-character",
// "micromark-util-chunked",
// "micromark-util-classify-character",
// "micromark-util-decode-numeric-character-reference",
// "micromark-util-html-tag-name",
// "micromark-util-normalize-identifier",
// "micromark-util-resolve-all",
// "micromark-util-subtokenize",
// "micromark-util-symbol",
// "property-information",
// "rehype-autolink-headings",
// "rehype-raw",
// "rehype-react",
// "rehype-sanitize",
// "rehype-slug",
// "remark-parse",
// "space-separated-tokens",
// "trough",
// "unified",
// "unist-util-stringify-position",
// "vfile",
// "web-namespaces",
// ]);
// import remarkPlugins from "./src/lib/docs/remark-plugins.js";
const svgoConfig = {
  plugins: [
    // {
    //   name: "preset-default",
    //   params: {
    //     overrides: {
    //       cleanupAttrs: true,
    //       removeDoctype: true,
    //       removeXMLProcInst: true,
    //       removeComments: true,
    //       removeMetadata: true,
    //       removeTitle: true,
    //       removeDesc: true,
    //       removeUselessDefs: true,
    //       removeEditorsNSData: true,
    //       removeEmptyAttrs: true,
    //       removeHiddenElems: true,
    //       removeEmptyText: true,
    //       removeEmptyContainers: true,
    //       removeViewBox: false,
    //       cleanupEnableBackground: true,
    //       convertStyleToAttrs: true,
    //       convertColors: {
    //         currentColor: true,
    //       },
    //       convertPathData: true,
    //       convertTransform: true,
    //       removeUnknownsAndDefaults: true,
    //       removeNonInheritableGroupAttrs: true,
    //       removeUselessStrokeAndFill: true,
    //       removeUnusedNS: true,
    //       cleanupIDs: true,
    //       cleanupNumericValues: {
    //         floatPrecision: 1,
    //       },
    //       moveElemsAttrsToGroup: true,
    //       moveGroupAttrsToElems: true,
    //       collapseGroups: true,
    //       removeRasterImages: false,
    //       mergePaths: true,
    //       convertShapeToPath: {
    //         convertArcs: true,
    //       },
    //       sortAttrs: true,
    //       removeDimensions: true,
    //     },
    //   },
    // },
    // {
    //   name: "removeAttrs",
    //   params: {
    //     attrs: "(width|height|style|color)",
    //   },
    // },
    // { convertPathData: { noSpaceAfterFlags: false } },
    // { mergePaths: { noSpaceAfterFlags: false } },
    // { prefixIds: false },
    // {
    //   convertColors: {
    //     currentColor: true,
    //   }
    // },
  ],
};

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  // swcMinify: true,
  // reactStrictMode: true,
  // experimental: {
  //   swcFileReading: false,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["jsx", "js", "ts", "tsx", "md", "mdx"],
  images: {
    domains: ["localhost:8080", "localhost"],
  },
  poweredByHeader: false,
  webpack: (config, { dev, isServer, ...options }) => {
    config.module.rules.push(
      // {
      //   test: /.mdx?$/, // load both .md and .mdx files
      //   use: [
      //     options.defaultLoaders.babel,
      //     {
      //       loader: "@mdx-js/loader",
      //       options: {
      //         remarkPlugins,
      //       },
      //     },
      //     path.join(__dirname, "./src/lib/docs/md-loader"),
      //   ],
      // },
      {
        test: /\.svg$/,
        // options: [svgoConfig],
        issuer: /\.(t|j)sx?$/,
        // {
        //   test: /\.(t|j)sx?$/
        // },
        use: [{ loader: "@svgr/webpack", options: { svgoConfig } }],
      }
    );
    if (!dev && isServer) {
      // we're in build mode so enable shared caching for the GitHub API
      process.env.USE_CACHE = "true";
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        // These scripts can import components from the app and use ES modules
        // entries['./scripts/build-rss.js'] = './scripts/build-rss.js';
        // entries['./scripts/index-docs.js'] = './scripts/index-docs.js';

        return entries;
      };
    }

    // config.resolve.alias["react"] = path.resolve('./node_modules/react');
    // config.resolve.alias["react-dom"] = path.resolve('./node_modules/react-dom');

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/",
      },
      {
        source: "/feed.xml",
        destination: "/_next/static/feed.xml",
      },
      {
        source: "/docs{/}?",
        destination: "/docs/overview",
      },
      {
        source: "/docs/tag/:tag{/}?",
        destination: "/docs/tag/:tag/overview",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // {
          //   key: "Strict-Transport-Security",
          //   value: "",
          // },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Robots-Tag",
            value: "all",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
  
};
