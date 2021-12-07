
import remarkSlug from "remark-slug";
import remarkDirective from "remark-directive";
// import remarkParagraphAlerts from "./remark-paragraph-alerts";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkToc from "remark-toc";

import remarkEmoji from "remark-emoji";
import remarkFootnotes from "remark-footnotes";
import remarkImages from "remark-images";




const plugins = [


  remarkSlug,
  // require("remark-slug"),
  remarkDirective,
  // require("remark-directive"),
  // remarkParagraphAlerts,
  // require("./remark-paragraph-alerts"),
  [
    remarkAutolinkHeadings,
    {
      behavior: "append",
      linkProperties: {
        class: ["anchor"],
        title: "Direct link to heading",
      },
    },
  ],
  [
    remarkToc,
    {
      skip: "Reference",
      maxDepth: 6,
    },
  ],
  remarkEmoji,
  remarkFootnotes,
  remarkImages,
];
// module.exports = plugins;
export default plugins;
