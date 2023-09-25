import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [likes, setLikes] = useState();
  const [commentText, setCommentText] = useState("");
  const v = searchParams.get("v");
  const object = useSelector((state) => state.object);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const p = object.filter((x) => x.postId === v);
    setPost(p[0]);
    const comm = JSON.parse(localStorage.getItem("comments")) || [];
    const c = comm.filter((prev) => prev.post_id === p[0].postId);
    setComments(c);

    const lik = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const l = lik.filter((prev) => prev.post_id === p[0].postId);
    setLikes(l);
  }, [v, object]);

  const handleLike = () => {
    
      const lik = JSON.parse(localStorage.getItem("likedPosts")) || [];
      let l = lik.filter((prev) => prev.post_id === post.postId);
      let like;
      if(l[0]?.liked) {
        like = {
          post_id: post.postId, 
          liked: false,
        };
      } else {
        like = {
          post_id: post.postId, 
          liked: true,
        };
      }
      const newLikes = []
      if(l.length === 0) {
        lik.forEach(x => newLikes.push(x));
        newLikes.push(like)
      } else {
        lik.forEach((prev) => {
          if(prev.post_id === post.postId) {
            newLikes.push(like);
          } else {
            newLikes.push(prev);
          }
        })
      }
      
      l = [like];
      setLikes(l);

      console.log(likes);
      // Update the local storage
      localStorage.setItem("likedPosts", JSON.stringify(newLikes));
  };

  const handleComment = () => {
      const comm = JSON.parse(localStorage.getItem("comments")) || [];
      const c = comm.filter((prev) => prev.post_id === post.postId);
      const comment = {
        post_id: post.postId, // You need to have the postId available
        text: commentText,
      };
      comm.push(comment)
      c.push(comment);
      setComments(c);

      console.log(comments);
      console.log(user);
      // Update the local storage
      localStorage.setItem("comments", JSON.stringify(comm));
  };

  return (
    <div>
      {post ? (
        <div className="px-5 flex gap-10">
          <ReactPlayer
            url={post.submission.mediaUrl}
            width="100%"
            height="600px"
            playing={true}
            controls={true}
            muted={true}
          />
          <div className="max-w-screen-lg">
            <div className="flex items-center gap-2">
              <img
                src={post.creator.pic}
                alt={post.creator.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{post.creator.handle}</span>
            </div>
            <h2 className="text-xl font-semibold">{post.submission.title}</h2>
            <p className="text-gray-600">{post.submission.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <button onClick={handleLike}>
                {likes[0]?.liked ? (
                  <FontAwesomeIcon icon={solidHeart} color="red" />
                ) : (
                  <FontAwesomeIcon icon={regularHeart} />
                )}
              </button>
              <button onClick={handleComment}>
                <FontAwesomeIcon icon={faComment} />
              </button>
              <span>{comments.length} Comments</span>
            </div>
            {/* Comments Section */}
              <div className="mt-4">
                <textarea
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handleComment}>Post Comment</button>
              </div>
            {/* Comments Section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Comments</h3>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <strong>{comment.username} </strong>
                    {comment.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Hello</p>
      )}
    </div>
  );
};
export default WatchPage;
