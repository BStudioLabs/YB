import { marked } from "marked";

/** Renders trusted, admin-authored markdown (project problem/solution).
 *  Content comes only from the password-protected admin — never from visitors. */
export default function Markdown({ children }: { children: string }) {
  const html = marked.parse(children, { async: false, breaks: true });
  return <div className="md" dangerouslySetInnerHTML={{ __html: html }} />;
}
