// hooks/scrollToComment.ts
export function scrollToComment(commentId: string) {
  const commentElement = document.getElementById(`comment-${commentId}`);
  if (commentElement) {
    commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    commentElement.classList.add("highlight-comment");
    setTimeout(() => {
      commentElement.classList.remove("highlight-comment");
    }, 3000);
  }
}
