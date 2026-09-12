import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ children, className, isDarkMode }) => {
  const [copied, setCopied] = useState(false);

  const code = String(children)
    .replace(/\r\n/g, "\n")
    .replace(/^\s+|\s+$/g, "");
  const language = /language-(\w+)/.exec(className || "")?.[1] || "text";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const baseButtonClasses =
    "absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] mob:text-xs font-medium transition";

  const stateClasses = copied
    ? isDarkMode
      ? "text-green-300 bg-green-900/30 border border-green-500"
      : "text-green-700 bg-gray-200 border border-green-500"
    : isDarkMode
      ? "text-gray-300 bg-gray-800 hover:bg-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300";

  return (
    <div
      className={`markdown-code-block relative my-4 rounded-md mob:rounded-lg overflow-hidden border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <button
        type="button"
        onClick={handleCopy}
        className={`${baseButtonClasses} ${stateClasses}`}
      >
        {copied && <span>Copied!</span>}
        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      </button>

      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? vscDarkPlus : vs}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: "0.375rem",
          background: isDarkMode ? "#0f172a" : "#f9fafb",
          fontSize: "0.875rem",
          padding: "0.75rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const Marddown = ({ text, isDarkMode, className = "" }) => {
  if (!text) return null;

  // Split markdown text so we can inspect lines around tables
  const rawLines = text.split(/\r?\n/);
  // Current table border mode: "X" (horizontal), "Y" (vertical), "XY" (both)
  let currentTableMode = "X";

  return (
    <div
      className={`markdown-content text-sm text-justify leading-relaxed max-w-full break-words font-text ${
        isDarkMode ? "text-gray-300" : "text-gray-700"
      }

/* ---------------- HEADINGS ---------------- */
[&>h1]:text-2xl [&>h1]:font-display [&>h1]:font-medium [&>h1]:mb-4 [&>h1]:mt-6
${isDarkMode ? "[&>h1]:text-turquoise-500" : "[&>h1]:text-turquoise-600"}

[&>h2]:text-xl [&>h2]:font-display [&>h2]:font-medium [&>h2]:mb-3 [&>h2]:mt-5
${isDarkMode ? "[&>h2]:text-turquoise-500" : "[&>h2]:text-turquoise-600"}

[&>h3]:text-lg [&>h3]:font-display [&>h3]:font-medium [&>h3]:mb-2 [&>h3]:mt-4
${isDarkMode ? "[&>h3]:text-turquoise-500" : "[&>h3]:text-turquoise-600"}

/* h4-h6 */
[&>h4]:text-base [&>h4]:font-display [&>h4]:font-medium [&>h4]:mb-2 [&>h4]:mt-4
${isDarkMode ? "[&>h4]:text-turquoise-500" : "[&>h4]:text-turquoise-600"}

/* ---------------- TEXT ---------------- */
[&>p]:mb-4 [&>p]:leading-relaxed
[&>li]:mb-2

{/* ---------------- INLINE FORMATTING ---------------- */}
[&>p>strong]:font-bold
[&>p>em]:italic
[&>p>del]:line-through
[&>p>del]:opacity-75
[&>p>mark]:rounded
[&>p>mark]:px-1
[&>p>mark]:bg-yellow-200
[&>p>p]:mb-2

/* ---------------- LINKS ---------------- */
[&>p>a]:font-medium
[&>p>a]:text-blue-500
[&>p>a]:underline-offset-2
[&>p>a:hover]:underline

/* ---------------- TASK LISTS ---------------- */
[&>ul.contains-task-list]:list-none
[&>ul.contains-task-list]:ml-0
[&>ul.contains-task-list]:pl-0
[&>ul>li.task-list-item]:flex
[&>ul>li.task-list-item]:items-start
[&>ul>li.task-list-item]:gap-2

/* ---------------- KBD ---------------- */
[&>p>kbd]:rounded
[&>p>kbd]:border
[&>p>kbd]:border-gray-300
[&>p>kbd]:bg-gray-100
[&>p>kbd]:px-1.5
[&>p>kbd]:py-0.5
[&>p>kbd]:font-mono
[&>p>kbd]:text-xs
${isDarkMode ? "[&>p>kbd]:border-gray-600 [&>p>kbd]:bg-gray-800 [&>p>kbd]:text-gray-200" : "[&>p>kbd]:text-gray-700"}

/* ---------------- SUB / SUP ---------------- */
[&>p>sub]:text-[10px]
[&>p>sup]:text-[10px]

/* ---------------- IMAGES ---------------- */
[&>p>img]:transition
[&>p>img:hover]:opacity-90

/* ---------------- BLOCKQUOTE ---------------- */
[&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:mb-4
${
  isDarkMode
    ? "[&>blockquote]:border-blue-400 [&>blockquote]:text-gray-300"
    : "[&>blockquote]:border-blue-500 [&>blockquote]:text-gray-600"
}

/* ================= INLINE CODE (SAFE) ================= */
[&>p>code]:whitespace-nowrap
[&>li>code]:whitespace-nowrap

/* ---------------- HR ---------------- */
[&>hr]:my-6
[&>hr]:border-0
[&>hr]:h-px
${isDarkMode ? "[&>hr]:bg-gray-700" : "[&>hr]:bg-gray-300"}
${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          p({ node, children }) {
            // Swallow custom table markers like (XTable), (YTable), (XYTable)
            const onlyChild =
              node?.children?.length === 1 ? node.children[0] : null;
            const value =
              onlyChild && typeof onlyChild.value === "string"
                ? onlyChild.value.trim()
                : null;

            if (value && /^\((XTable|YTable|XYTable)\)$/i.test(value)) {
              return null;
            }

            return <p>{children}</p>;
          },
          hr() {
            return (
              <hr
                className={`my-6 border-0 h-px ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
            );
          },

          code({ inline, className, children }) {
            const raw = String(children ?? "");
            const isInline =
              inline ??
              (!raw.includes("\n") && !/language-\w+/.test(className || ""));

            if (isInline) {
              return (
                <code
                  className={`inline-flex items-center max-w-full overflow-x-auto overflow-y-hidden min-w-0 px-1.5 py-0.5 mx-1 my-0.5 rounded-md mob:rounded-lg text-[11px] mob:text-xs font-code whitespace-nowrap custom-scrollbar ${
                    isDarkMode
                      ? "bg-gray-800 text-blue-300 ring-1 ring-gray-700"
                      : "bg-gray-100 text-blue-600 ring-1 ring-gray-200"
                  }`}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock className={className} isDarkMode={isDarkMode}>
                {children}
              </CodeBlock>
            );
          },

          a({ href, children }) {
            if (!href) return <a>{children}</a>;

            const isExternal =
              href.startsWith("http://") || href.startsWith("https://");

            return (
              <a
                href={href}
                className="break-words text-blue-500 hover:underline"
                {...(isExternal
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
              >
                {children}
              </a>
            );
          },

          ul({ children }) {
            return (
              <ul className="ml-6 mb-4 list-disc space-y-1 [&>li>ul]:mt-1 [&>li>ul]:ml-6 [&>li>ol]:mt-1 [&>li>ol]:ml-6">
                {children}
              </ul>
            );
          },

          ol({ children }) {
            return (
              <ol className="ml-6 mb-4 list-decimal space-y-1 [&>li>ul]:mt-1 [&>li>ul]:ml-6 [&>li>ol]:mt-1 [&>li>ol]:ml-6">
                {children}
              </ol>
            );
          },

          img({ src, alt }) {
            return (
              <img
                src={src}
                alt={alt}
                className="my-4 w-full max-w-full rounded-md transition hover:opacity-90 mob:rounded-lg"
                style={{ height: "auto" }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            );
          },

          strong({ children }) {
            return (
              <strong className="font-bold text-gray-900 dark:text-gray-100">
                {children}
              </strong>
            );
          },

          em({ children }) {
            return <em className="italic">{children}</em>;
          },

          del({ children }) {
            return (
              <del className="text-gray-500 line-through decoration-gray-400 dark:text-gray-400">
                {children}
              </del>
            );
          },

          mark({ children }) {
            return (
              <mark className="rounded bg-yellow-200 px-1 text-black dark:bg-yellow-300 dark:text-black">
                {children}
              </mark>
            );
          },

          table({ children, node }) {
            // Detect mode by scanning previous non-empty line for (XTable)/(YTable)/(XYTable)
            currentTableMode = "X";

            const startLine = node?.position?.start?.line;
            if (startLine && startLine - 2 >= 0) {
              for (let i = startLine - 2; i >= 0; i--) {
                const line = rawLines[i]?.trim();
                if (!line) continue;

                const m = line.match(/^\((XTable|YTable|XYTable)\)$/i);
                if (m) {
                  const tag = m[1].toUpperCase();
                  if (tag === "YTABLE") currentTableMode = "Y";
                  else if (tag === "XYTABLE") currentTableMode = "XY";
                  else currentTableMode = "X";
                }
                break;
              }
            }

            const outerBorder = isDarkMode
              ? "border-gray-700 bg-gradient-to-b from-slate-900/70 to-slate-900/40"
              : "border-gray-200 bg-gradient-to-b from-white to-slate-50";

            return (
              <div
                className={`overflow-x-auto my-4 rounded-md mob:rounded-lg border ${outerBorder}`}
              >
                <table
                  className={`w-full text-xs mob:text-sm sm:text-base ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {children}
                </table>
              </div>
            );
          },

          thead({ children }) {
            return (
              <thead
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {children}
              </thead>
            );
          },

          tbody({ children }) {
            return <tbody>{children}</tbody>;
          },

          tr({ children }) {
            return <tr>{children}</tr>;
          },

          th({ children }) {
            const hasHorizontal =
              currentTableMode === "X" || currentTableMode === "XY";
            const hasVertical =
              currentTableMode === "Y" || currentTableMode === "XY";

            const horizontalClass = hasHorizontal
              ? isDarkMode
                ? "border-b border-gray-700"
                : "border-b border-gray-300"
              : "";

            const verticalClass = hasVertical
              ? isDarkMode
                ? "border-l border-gray-700 first:border-l-0"
                : "border-l border-gray-300 first:border-l-0"
              : "";

            return (
              <th
                className={`px-2 py-0.5 mob:py-1 sm:py-2 sm:px-3 text-left font-semibold ${horizontalClass} ${verticalClass}`}
              >
                {children}
              </th>
            );
          },

          td({ children }) {
            const hasHorizontal =
              currentTableMode === "X" || currentTableMode === "XY";
            const hasVertical =
              currentTableMode === "Y" || currentTableMode === "XY";

            const horizontalClass = hasHorizontal
              ? isDarkMode
                ? "border-b border-gray-800"
                : "border-b border-gray-200"
              : "";

            const verticalClass = hasVertical
              ? isDarkMode
                ? "border-l border-gray-800 first:border-l-0"
                : "border-l border-gray-200 first:border-l-0"
              : "";

            return (
              <td
                className={`px-2 py-0.5 mob:py-1 sm:py-2 sm:px-3 ${horizontalClass} ${verticalClass}`}
              >
                {children}
              </td>
            );
          },

          input({ type, checked, ...props }) {
            if (type === "checkbox") {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="mt-1 accent-turquoise-600"
                  {...props}
                />
              );
            }

            return <input type={type} {...props} />;
          },

          kbd({ children }) {
            return (
              <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                {children}
              </kbd>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default Marddown;
