/** @jsx jsx */
import { useState } from "react";
import { Comment } from "use-comments";
import { Box, Button, Label, Textarea, jsx } from "theme-ui";

export interface AddCommentProps {
  onSubmit: (comment: Pick<Comment, "author" | "content">) => void;
}
export const AddComment = ({ onSubmit }: AddCommentProps) => {
  const [comment, setComment] = useState("");

  return (
    <Box
      as="form"
      onSubmit={e => {
        console.log({ e });
        e.preventDefault();
        onSubmit({ content: comment});
      }}
    >

      <Label htmlFor="comment">Comment</Label>
      <Textarea
        name="comment"
        id="comment"
        rows={2}
        placeholder="Tell me what you think 😊"
        value={comment}
        onChange={e => setComment(e.target.value)}
        sx={{ mb: 3, fontFamily: "body" }}
      />
      <Button
        sx={{
          mb: 3,
          ...((!comment) && {
            bg: "gray",
            pointerEvents: "none"
          })
        }}
      >
        Add comment
      </Button>
    </Box>
  );
};
