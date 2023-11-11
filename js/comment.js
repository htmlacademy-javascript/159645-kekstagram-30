const commentsListElement = document.querySelector('.social__comments');
const commentCountElement = document.querySelector('.social__comment-count');
const commenstLoaderElement = document.querySelector('.comments-loader');
const commentElement = document.querySelector('#comment')
  .content.querySelector('.social__comment');

const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = (comments) => {
  commentsListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = createComment(comment);
    fragment.append(newComment);
  });

  commentsListElement.append(fragment);
};

const initCommentsList = () => {
  commentCountElement.classList.add('hidden');
  commenstLoaderElement.classList.add('hidden');
};

export { renderComments, initCommentsList };
