"use client";
import { useState, useRef, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handleCopy}
        title="Copier"
        style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          background: copied ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "4px",
          padding: "2px 7px",
          cursor: "pointer",
          fontSize: "11px",
          color: copied ? "#94a3b8" : "#475569",
          lineHeight: "18px",
          zIndex: 1,
          transition: "all 0.15s",
        }}
      >
        {copied ? "✓" : "📋"}
      </button>
      <pre
        ref={preRef}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "10px 40px 10px 14px",
          borderRadius: "6px",
          margin: "10px 0",
          overflowX: "auto",
          fontSize: "12px",
          lineHeight: 1.55,
        }}
      >
        {children}
      </pre>
    </div>
  );
}

export function MarkdownRenderer({
  content,
  accentColor,
}: {
  content: string;
  accentColor: string;
}) {
  return (
    <div className="markdown-body" style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: 1.65 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                color: accentColor,
                fontSize: "20px",
                fontWeight: 700,
                margin: "16px 0 10px",
                letterSpacing: "-0.01em",
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              style={{
                color: accentColor,
                fontSize: "16px",
                fontWeight: 600,
                margin: "18px 0 8px",
                paddingTop: "10px",
                borderTop: `1px solid ${accentColor}20`,
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              style={{
                color: "#e2e8f0",
                fontSize: "14px",
                fontWeight: 600,
                margin: "14px 0 6px",
              }}
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              style={{
                color: "#cbd5e1",
                fontSize: "13px",
                fontWeight: 600,
                margin: "10px 0 4px",
              }}
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p style={{ margin: "8px 0", color: "#cbd5e1" }}>{children}</p>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                listStyle: "disc outside",
                paddingLeft: "22px",
                margin: "8px 0",
                color: "#cbd5e1",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                listStyle: "decimal outside",
                paddingLeft: "22px",
                margin: "8px 0",
                color: "#cbd5e1",
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ margin: "3px 0", color: "#cbd5e1" }}>{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: accentColor, textDecoration: "underline" }}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>{children}</strong>
          ),
          em: ({ children }) => (
            <em style={{ color: "#cbd5e1", fontStyle: "italic" }}>{children}</em>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: `3px solid ${accentColor}80`,
                paddingLeft: "12px",
                margin: "10px 0",
                color: "#94a3b8",
                fontStyle: "italic",
                background: `${accentColor}05`,
              }}
            >
              {children}
            </blockquote>
          ),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: ({ inline, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  {...props}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    padding: "1px 5px",
                    borderRadius: "3px",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: "12px",
                    color: accentColor,
                  }}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: "12px",
                  color: "#cbd5e1",
                }}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          hr: () => (
            <hr
              style={{
                border: "none",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                margin: "18px 0",
              }}
            />
          ),
          table: ({ children }) => (
            <div style={{ overflowX: "auto", margin: "10px 0" }}>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  fontSize: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ background: `${accentColor}10` }}>{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{children}</tr>
          ),
          th: ({ children }) => (
            <th
              style={{
                padding: "8px 10px",
                textAlign: "left",
                color: accentColor,
                fontWeight: 600,
                borderRight: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                padding: "7px 10px",
                color: "#cbd5e1",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                verticalAlign: "top",
              }}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
