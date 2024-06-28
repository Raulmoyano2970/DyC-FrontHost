import moment from 'moment';
import { useEffect, useState, useRef } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea, Dropdown } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { IoCloudDownloadOutline } from "react-icons/io5";
import { PiPrinterLight } from "react-icons/pi";
import ModalReceta from '../pages/Receta/ModalReceta';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [estadoModal, setEstadoModal] = useState(false);
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isHidden) {
    return null; // Completely hide the comment if isHidden is true
  }

  const handleViewComment = () => {
    setCurrentComment(comment);
    setEstadoModal(true);
  };

  const handleDownloadPDF = () => {
    const input = printRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('download.pdf');
      });
  };

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : content;
  };

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
  }

  return (
    <div className='flex'>
      <div className='flex'>
        {isEditing ? (
          <>
            <Textarea
              className='mb-2'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button type='button' size='sm' onClick={handleSave}>
                Guardar
              </Button>
              <Button type='button' size='sm' outline onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          </>
        ) : (
          <>
            <ModalReceta
              state={estadoModal}
              setState={setEstadoModal}
            >
              <div ref={printRef} className='p-10' >
                <div>
                  <h1 className='pb-3 text-lg font-semibold'>{comment.name && comment.name}</h1>
                </div>
                <div className='border-2 border-teal-500 p-5 rounded-md	'>
                  <div className='flex items-start text-lg'>
                    <h3 className='font-semibold pr-1'>Nombre: </h3>
                    <p>{post && post.contenido}</p>
                  </div>
                  <div className='flex items-start text-lg'>
                    <h3 className='font-semibold pr-1'>Rut:</h3>
                    <p>{post && post.title}</p>
                  </div>
                  <div className='flex items-start text-lg font'>
                    <h3 className='font-semibold pr-1'>Sexo:</h3>
                    <p>{post && post.category}</p>
                  </div>
                  <div className='flex items-start text-lg font'>
                    <h3 className='font-semibold pr-1'>Edad: </h3>
                    <p>{calcularEdad(post?.edad)} años </p>
                  </div>
                  <div className='flex items-start text-lg font'>
                    <h3 className='font-semibold pr-1'>Fecha emision orden: </h3>
                    <p>{new Date(comment.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className='border-2 border-teal-500 p-5 mt-3 rounded-md'>
                    <div className='text-lg'>
                      <div className='flex items-start text-lg font'>
                        <h3 className='font-semibold pr-1'>Detalle: </h3>
                      </div>
                      <div className='flex items-start text-lg font'>
                        <p>{currentComment && formatContent(currentComment.content)}</p>
                      </div>
                    </div>
                  </div>
                <div className=''>
                  <div className='text-lg pt-40'>
                    <hr className="flex justify-center w-64 h-px mx-auto bg-gray-300 border-0 rounded md:my-1 dark:bg-gray-700" />
                    <h3 className='flex justify-center font-semibold p-3'>Firma Medico</h3>
                </div>
                </div>
              </div>
              <div className="download pt-2 flex justify-center items-center">
                <button 
                  className="bg-teal-500 text-white flex-rows gap-3 rounded-lg px-4 py-3 text-sm hover:bg-teal-800 transition duration-0 hover:duration-700"
                  onClick={handleDownloadPDF}
                >
                  Descargar
                  <IoCloudDownloadOutline className="pl-2 inline w-7 h-7" />
                </button>
                <button 
                  className="bg-teal-500 text-white flex-rows gap-3 rounded-lg px-4 py-3 text-sm hover:bg-teal-800 transition duration-0 hover:duration-700"
                  onClick={useReactToPrint({ content: () => printRef.current })}
                >
                  Imprimir
                  <PiPrinterLight className="pl-1 inline w-7 h-7" />
                </button>
              </div>
            </ModalReceta>
            <p className='flex flex-auto text-black-700 pr-2'>{truncateContent(comment.content,6)}</p>
            <div className='flex flex-auto'>
              <h1 className='flex flex-auto text-gray-500 ml-2 mr-5'>Tipo: 
                <span className='pl-2 text-gray-700 dark:text-white'>{comment.name && comment.name}</span>
              </h1>
            </div>
            <div className='items-center text-xs dark:border-gray-700 max-w-fit gap-2 self-start place-self-end'>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <Dropdown size='sm' >
                    <Dropdown.Item onClick={handleViewComment}>
                      Ver
                    </Dropdown.Item>
                    {/* <Dropdown.Item onClick={handleEdit}>
                      Editar
                    </Dropdown.Item> */}
                    <Dropdown.Item onClick={() => onDelete(comment._id)}>
                      Eliminar
                    </Dropdown.Item>
                  </Dropdown>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
