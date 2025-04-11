// "use client";

// import { useState, useCallback } from "react";
// import { Comment } from "../../types/Comment";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { formatDistanceToNow } from "date-fns";
// import { Button } from "../ui/button";

// interface CommentListProps {
//   comments: Comment[];
// }

// export function CommentList({ comments }: CommentListProps) {
//   const [visibleComments, setVisibleComments] = useState(5);

//   const showMoreComments = useCallback(() => {
//     setVisibleComments((prevVisible) => prevVisible + 5);
//   }, []);

//   const hasMoreComments = visibleComments < comments.length;

//   return (
//     <div className="space-y-6">
//       {comments.slice(0, visibleComments).map((comment) => (
//         <div
//           key={`${comment.id}-${comment.commentedAt}`}
//           className="flex space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
//         >
//           <Avatar className="w-10 h-10">
//             <AvatarImage src="/placeholder-avatar.jpg" alt={comment.userId} />
//             <AvatarFallback className="bg-primary text-primary-foreground">
//               {comment.userId[0].toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex-grow">
//             <div className="flex items-center space-x-2">
//               <h4 className="font-semibold text-gray-800 dark:text-gray-200">
//                 {comment.userId}
//               </h4>
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 {formatDistanceToNow(new Date(comment.commentedAt), {
//                   addSuffix: true,
//                 })}
//               </span>
//             </div>
//             <p className="mt-1 text-gray-600 dark:text-gray-300">
//               {comment.content}
//             </p>
//           </div>
//         </div>
//       ))}
//       {hasMoreComments && (
//         <div className="flex justify-center mt-4">
//           <Button
//             onClick={showMoreComments}
//             variant="outline"
//             className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors duration-200"
//           >
//             Show More Comments
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useCallback } from "react";
import { Comment } from "../../types/Comment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  const [visibleComments, setVisibleComments] = useState(5);

  const showMoreComments = useCallback(() => {
    setVisibleComments((prevVisible) => prevVisible + 5);
  }, []);

  const hasMoreComments = visibleComments < comments.length;

  return (
    <div className="space-y-6">
      {comments.slice(0, visibleComments).map((comment) => (
        <div
          key={`${comment.id}-${comment.commentedAt}`}
          id={`comment-${comment.id}`}
          className="flex space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm transition-colors duration-300"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-avatar.jpg" alt={comment.userId} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {comment.userId[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                {comment.userId}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(comment.commentedAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
      {hasMoreComments && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={showMoreComments}
            variant="outline"
            className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors duration-200"
          >
            Show More Comments
          </Button>
        </div>
      )}
    </div>
  );
}
