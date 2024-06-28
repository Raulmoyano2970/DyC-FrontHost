import React from 'react';
import { Button, Spinner, Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaThumbsUp } from 'react-icons/fa';
import CommentSection from '../components/CommentSection';
import DashSidebar from '../components/DashSidebar';
import { TextInput } from 'flowbite-react';
import ModalReceta from './Receta/ModalReceta';
//IMPORTACION ORDENES
import CommentPostExodoncia from '../components/ordenes/PostExodoncia';
import CommentCirugiaMayor from '../components/ordenes/CirugiaMayor';
import CommentCirugiaMayorAmbulatoria from '../components/ordenes/CirugiaMayorAmbulatoria';
import CommentHabitoDefecatorio from '../components/ordenes/HabitoDefecatorio';
import CommentPrurito from '../components/ordenes/Prurito';
import CommentCertificado from '../components/ordenes/Certificado';
import CommentRecetaMedica from '../components/ordenes/RecetaMedica';
import CommentInterconsulta from '../components/ordenes/Interconsulta';
import CommentFonoaudiologia from '../components/ordenes/Fonoaudiologia';
import CommentExamenesLaboratorio from '../components/ordenes/ExamenesLaboratorio';
import CommentSolicitudImagenes from '../components/ordenes/SolicitudImagenes';
import CommentSolicitudElectro from '../components/ordenes/SolicitudElectrocardiograma';
import CommentSolProcEndoscopicos from '../components/ordenes/SolicitudProcEndoscopicos';
import CommentManejoKinesico from '../components/ordenes/ManejoKinesico';
import CommentRecetaMagistral from '../components/ordenes/RecetaMagistral';

//VISTA PERFIL PACIENTE
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  // USE STATE MODAL

  const [estadoModalRecetaMedica, setEstadoModalRecetaMedica] = useState(false);
  const [estadoModalInterconsulta, setEstadoModalInterconsulta] = useState(false);
  const [estadoModalFonoaudiologia, setEstadoModalFonoaudiologia] = useState(false);
  const [estadoModalHDefecatorio, setEstadoModalHDefecatorio] = useState(false);
  const [estadoModalCertificado, setEstadoModalCertificado] = useState(false);
  const [estadoModalCirugiaMayor, setEstadoModalCirugiaMayor] = useState(false);
  const [estadoModalExamenLaboratorio, setEstadoModalExamenLaboratorio] = useState(false);
  const [estadoModalPostExodoncia, setEstadoModalPostExodoncia] = useState(false);
  const [estadoModalPrurito, setEstadoModalPrurito] = useState(false);
  const [estadoModalCirugiaMayorAmbulatoria, setEstadoModalCirugiaMayorAmbulatoria] = useState(false);
  const [estadoModalSolicitudImagenes, setEstadoModalSolicitudImagenes] = useState(false);
  const [estadoModalSolicitudElectro, setEstadoModalSolicitudElectro] = useState(false);
  const [estadoModalSolProcEndoscopicos, setEstadoModalSolProcEndoscopicos] = useState(false);
  const [estadoModalManejoKinesico, setEstadoModalManejoKinesico] = useState(false);
  const [estadoModalRecetaMagistral, setEstadoModalRecetaMagistral] = useState(false);


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

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

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

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
    
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* DASHBOARD PATIENT */}
      <main className='p-2 flex flex-col max-w-6xl mx-auto min-h-screen'>
        {/* BUTTON BACK */}
        <div className="flex gap-4 pt-1">
          <Link
              to="/dashboard?tab=posts"
              className="rounded-lg py-3 px-4 text-white bg-teal-600 hover:bg-teal-800"
            >
              <IoArrowBackOutline />
            </Link>
            <div className='flex'>
              <h1 className="self-center text-xl font-semibold">{post && post.contenido}</h1>
            </div>
        </div>
        {/* CONTAINER CARDS */}
        <div className='grid grid-cols-12 gap-6 my-2 items-start'>
          {/* LEFT CARD */}
          <div class="col-span-12 flex-colo lg:col-span-4 bg-gray-500 bg-opacity-10 rounded-xl p-6 top-18">
            <div class="space-y-4 xl:space-y-6">
              <img class="mx-auto rounded-full h-36 w-36" src={'https://static.vecteezy.com/system/resources/previews/021/352/965/original/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png'} alt="author avatar"/>
              <div class="space-y-2">
                <div class="flex justify-center items-center flex-col space-y-1 text-lg font-medium leading-6">
                  <h3 class="text-xl font-semibold text-teal-800 dark:text-white">{post && post.contenido}</h3>
                  <p class="text-gray-500 dark:text-indigo-300">{post && post.title}</p>
                  <p class="text-gray-500 dark:text-indigo-300">{calcularEdad(post?.edad)} años</p>
                  <div className=''>
                    <Button className='inline-block m-1' color='gray' pill size='xs'>
                      {post && post.category}
                    </Button>
                    <Button className='inline-block' color='gray' pill size='xs'>
                      {post && post.sanguineo}
                    </Button>
                  </div> 
                  <Button color='gray' pill size='xs'>
                    {post && post.content}
                  </Button>
                </div>
              </div>
            </div>
            <div class="col-span-12 flex-colo lg:col-span-4 bg-gray-500 bg-opacity-10 rounded-xl p-2 flex justify-center items-center flex-col mt-2">
              <p class=" text-gray-500 dark:text-indigo-300 text-sm">
                <span className='text-teal-800 dark:text-white'>celular </span>
                {post && post.celular}
              </p>
              <p class="text-gray-500 dark:text-indigo-300 text-sm">
                <span className='text-teal-800 dark:text-white'>tel emergencia </span>
                {post && post.celularemergencia}
              </p>
              <p class="text-gray-500 dark:text-indigo-300 text-sm text-center	">
                <span className='text-teal-800 dark:text-white text-right'>direccion </span>
                {post && post.direccion}
              </p>
              <p class="text-gray-500 dark:text-indigo-300 text-sm">
              <span className='text-teal-800 dark:text-white'>email </span>
                {post && post.email}
              </p>
            </div>
          </div>
          {/* RIGHT CARD */}
          <div className="col-span-12 gap-2 lg:col-span-8 bg-gray-500 bg-opacity-10 rounded-xl p-6">
            <div className='grid grid-cols-2 gap-4 place-items-stretch'>
              <h1 className='flex flex-auto text-center items-center pl-5'>
                Historial Medico
              </h1>
              <div className='items-end self-end place-content-end place-items-end place-self-end flex  justify-end justify-items-end justify-self-end content-end'>
                <Dropdown
                  label="Crear orden"
                  className='droppost w-full flex justify-center p-4 text-white text-sm font-medium rounded-lg'
                >
                  <Dropdown.Item onClick={() => setEstadoModalRecetaMedica(true)}>
                    Receta Medica
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalInterconsulta(true)}>
                    Interconsulta
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalFonoaudiologia(true)}>
                    Fonoaudiologia
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalHDefecatorio(true)}>
                    Habito Defecatorio
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalCertificado(true)}>
                    Certificado
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalCirugiaMayor(true)}>
                    Cirugia Mayor
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalCirugiaMayorAmbulatoria(true)}>
                    Cirugia Mayor Amb.
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalExamenLaboratorio(true)}>
                    Examen Lab.
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalPostExodoncia(true)}>
                    Post Exodoncia
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalPrurito(true)}>
                    Prurito 
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalSolicitudImagenes(true)}>
                    Solicitud Imag.
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalSolicitudElectro(true)}>
                    Solicitud Electro.
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalSolProcEndoscopicos(true)}>
                    Solicitud Proc. Endoscopicos
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalManejoKinesico(true)}>
                    Manejo Kinesico
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setEstadoModalRecetaMagistral(true)}>
                    Receta Magistral
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <div className='w-full gap-4 transitions text-white text-sm font-medium px-2 py-1 rounded'>
                
                {/* RECETA MEDICA*/}
                <ModalReceta
                  state= {estadoModalRecetaMedica}
                  setState = {setEstadoModalRecetaMedica}
                  title="Receta Medica"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p>{calcularEdad(post?.edad)} años  </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                        <CommentRecetaMedica postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* POST EXODONCIA */}
                <ModalReceta
                  state= {estadoModalPostExodoncia}
                  setState = {setEstadoModalPostExodoncia}
                  title="Indicaciones Post Exodoncia"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentPostExodoncia postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* INDICACIONES CIRUGIA MAYOR AMBULATORIA */}
                <ModalReceta
                  state= {estadoModalCirugiaMayorAmbulatoria}
                  setState = {setEstadoModalCirugiaMayorAmbulatoria}
                  title="Indicaciones Cirugia Mayor Ambulatoria"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentCirugiaMayorAmbulatoria postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* INDICACIONES CIRUGIA MAYOR */}
                <ModalReceta
                  state= {estadoModalCirugiaMayor}
                  setState = {setEstadoModalCirugiaMayor}
                  title="Indicaciones Cirugia Mayor"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentCirugiaMayor postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* INDICACIONES HABITO DEFECATORIO */}
                <ModalReceta
                  state= {estadoModalHDefecatorio}
                  setState = {setEstadoModalHDefecatorio}
                  title="Indicaciones Habito Defecatorio"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentHabitoDefecatorio postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* INDICACIONES PRURITO */}
                <ModalReceta
                  state= {estadoModalPrurito}
                  setState = {setEstadoModalPrurito}
                  title="Indicaciones Prurito"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentPrurito postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* CERTIFICADO */}
                <ModalReceta
                  state= {estadoModalCertificado}
                  setState = {setEstadoModalCertificado}
                  title="Certificado Medico"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentCertificado postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* INTERCONSULTA */}
                <ModalReceta
                  state= {estadoModalInterconsulta}
                  setState = {setEstadoModalInterconsulta}
                  title="Interconsulta"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p>{calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentInterconsulta postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* FONOAUDIOLOGIA */}
                <ModalReceta
                  state= {estadoModalFonoaudiologia}
                  setState = {setEstadoModalFonoaudiologia}
                  title="Fonoaudiologia"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentFonoaudiologia postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* RECETA MEDICA*/}
                <ModalReceta
                  state= {estadoModalRecetaMedica}
                  setState = {setEstadoModalRecetaMedica}
                  title="Receta Medica"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                        <CommentRecetaMedica postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* EXAMEN LABORATORIO */}
                <ModalReceta
                  state= {estadoModalExamenLaboratorio}
                  setState = {setEstadoModalExamenLaboratorio}
                  title="Examenes de Laboratorio"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p> {calcularEdad(post?.edad)} años </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                            <CommentExamenesLaboratorio postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* SOLICITUD DE IMAGENES*/}
                <ModalReceta
                  state= {estadoModalSolicitudImagenes}
                  setState = {setEstadoModalSolicitudImagenes}
                  title="Solicitud de Imagenes"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p>{calcularEdad(post?.edad)} años  </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                        <CommentSolicitudImagenes postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* SOLICITUD ELECTROCARDIOGRAMA*/}
                <ModalReceta
                  state= {estadoModalSolicitudElectro}
                  setState = {setEstadoModalSolicitudElectro}
                  title="Solicitud de Electrocardiograma"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p>{calcularEdad(post?.edad)} años  </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                        <CommentSolicitudElectro postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* SOLICITUD PROCEDCIMIENTOS ENDOSCOPICOS*/}
                <ModalReceta
                  state= {estadoModalSolProcEndoscopicos}
                  setState = {setEstadoModalSolProcEndoscopicos}
                  title="Solicitud de Procedimientos Endoscópicos"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p>{calcularEdad(post?.edad)} años  </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                        <CommentSolProcEndoscopicos postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* MANEJO KINESICO*/}
                <ModalReceta
                  state= {estadoModalManejoKinesico}
                  setState = {setEstadoModalManejoKinesico}
                  title="Manejo Kinesico"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p>{calcularEdad(post?.edad)} años  </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                        <CommentManejoKinesico postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>

                {/* RECETA MAGISTRAL*/}
                <ModalReceta
                  state= {estadoModalRecetaMagistral}
                  setState = {setEstadoModalRecetaMagistral}
                  title="Receta Magistral"
                > 
                  <div>
                    <div className='flex items-start text-lg pb-2'>
                        <h1 className='font-semibold pr-1'>Nombre: </h1>
                        <p>{post && post.contenido}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Rut:</h1>
                        <p>{post && post.title}</p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Edad: </h1>
                        <p>{calcularEdad(post?.edad)} años  </p>
                    </div>
                    <div className='flex items-start text-lg font pb-2'>
                        <h1 className='font-semibold pr-1'>Sexo:</h1>
                        <p>{post && post.category}</p>
                    </div>
                    <div className=''>
                        <div className='text-lg'>
                        <CommentRecetaMagistral postId={post._id} />
                        </div>
                    </div>
                  </div>
                </ModalReceta>
              </div>
            </div>
            <CommentSection postId={post._id}/>
          </div>
        </div>
      </main>
    </div>
  );
}