/** @jsx jsx */
import { jsx, Container, BaseStyles, ThemeProvider } from "theme-ui";
import { useComments, CommentStatus } from "use-comments";

import theme from "./theme";

import { AddComment } from "./AddComment";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  if (Math.floor(seconds) === 0) {
    return "now";
  }
  return Math.floor(seconds) + " seconds ago";
};

const formatStatus = (status: CommentStatus) => {
  switch (status) {
    case "added":
      return "👌";
    case "delivered-awaiting-approval":
      return "🕑";
    case "sending":
      return "✉️";
  }
};

const Comments = ({ postId }: { postId: string }) => {
  const { comments, addComment, count, loading } = useComments(
    "https://wheres-foster.herokuapp.com/v1/graphql",
    postId
  );

  return (
    <section sx={{ width: "70%" }}>
      <AddComment onSubmit={addComment} />
      <h3>{count === 1 ? "1 comment" : `${count} comments`}</h3>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {comments.map(({ author, content, created_at, status }) => (
            <article key={created_at}>
              <div>
                {`${author} ・ `}
                <time dateTime={created_at}>{formatDate(created_at)}</time>
                {status && ` ・ ${formatStatus(status)}`}
              </div>
              <p>{content}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BaseStyles>
        <Container sx={{ p: [2, 4] }}>
          <Comments postId="demo-app-theme-ui" />
        </Container>
      </BaseStyles>
    </ThemeProvider>
  );
}
