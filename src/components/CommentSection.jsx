import { Button, Modal, Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import 'react-quill/dist/quill.snow.css';
import ModalReceta from '../pages/Receta/ModalReceta';

//VISTA CREAR RECETA
export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const [currentComment, setCurrentComment] = useState(null);
  const [estadoModal, setEstadoModal] = useState(false);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 2000) {
      return; 
    }
    const strippedComment = stripHtml(comment);
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: strippedComment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleViewComment = () => {
    setCurrentComment(comment);
    setEstadoModal(true);
  };
  const handleHideForm = () => {
    setShowForm(false);
  };
  const handleChange = (value) => {
    setComment(value);
};
  return (
    
    <div className='max-w-2xl mx-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
          <>
          {comments.map((comment) => (
            <div class="detallescoment flex my-2 bg-gray-500 bg-opacity-10 rounded-lg p-4">
              <div class="flex flex-auto pr-5 detallecomment">
                <h1>{new Date(comment.updatedAt).toLocaleDateString()}</h1>
              </div>
              <div class="flex flex-auto">
                <div className='flex flex-auto'>
                  <div className='flex flex-auto'>
                    <h1 className='flex text-gray-500 mr-2'>Detalle:</h1>
                  </div>
                  <div>
                    <Comment
                      key={comment._id}
                      comment={comment}
                      onLike={handleLike}
                      onEdit={handleEdit}
                      onDelete={(commentId) => {
                        setShowModal(true);
                        setCommentToDelete(commentId);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No tiene ordenes aun</p>
      ) : (
        <>
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
        >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Esta por eliminar esta receta completamente del registro
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Si, eliminar
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
