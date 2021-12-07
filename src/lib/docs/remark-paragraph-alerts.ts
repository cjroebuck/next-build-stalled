import { is } from "unist-util-is";
import { visit } from "unist-util-visit";
import { Node, Parent } from "unist";

const sigils = {
  "=>": "success",
  "->": "info",
  "~>": "warning",
  "!>": "danger",
};

interface ParagraphNode extends Parent {
  type: "paragraph";
  depth: number;
}
interface TextNode extends Parent {
  type: "text";
  depth: number;
  value: string;
}

// comment this function out and it works
export default function paragraphCustomAlertsPlugin() {
  return function transformer(tree: Node) {

    // this seems to be offending line (the call to visit)
    visit(tree, "paragraph", (pNode: ParagraphNode, _:any, parent: Parent) => {
      visit(pNode, "text", (textNode: TextNode) => {
        Object.keys(sigils).forEach((symbol) => {
          if (textNode.value.startsWith(`${symbol} `)) {
            // Remove the literal sigil symbol from string contents
            textNode.value = textNode.value.replace(`${symbol} `, "");
            // Wrap matched nodes with <div> (containing proper attributes)
            parent.children = parent.children.map((node: Node) => {
              return is(pNode, node)
                ? {
                    type: "wrapper",
                    children: [node],
                    data: {
                      hName: "div",
                      hProperties: {
                        className: ["alert", `alert-${sigils[symbol]}`],
                        role: "alert",
                      },
                    },
                  }
                : node;
            });
          }
        });
      });
    });
  };
}
