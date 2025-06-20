import {
  collection, addDoc, getDocs, deleteDoc, updateDoc,
  doc, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

const webForm = document.getElementById('cargar pagina');
const listaweb = document.getElementById('paginaweb');
const buscarInput = document.getElementById('buscarweb');
const webRef = collection(db, 'web');

libroForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = webForm.nombre.value;
  const pagina = webForm.pagina.value;
  const tema = parseInt(webForm.tema.value);
  const ejemplo = webForm.ejemplo.value;

  await addDoc(webRef, { nombre, pagina, tema, ejemplo });
  webForm.reset();
  mostrarweb();
});

async function mostrarweb() {
  listaWeb.innerHTML = '';
  const querySnapshot = await getDocs(webRef);
  querySnapshot.forEach(docSnap => {
    const libro = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${web.nombre}</strong> - ${web.pagina} (${web.tema}) - ${web.ejemplo}
      <button onclick="editarLibro('${docSnap.id}', '${web.nombre}', '${web.pagina}', ${web.tema}, '${web.ejemplo}')">Editar</button>
      <button onclick="eliminarWeb('${docSnap.id}')">Eliminar</button>
    `;
    listaWeb.appendChild(div);
  });
}

async function eliminarWeb(id) {
  await deleteDoc(doc(db, 'web', id));
  mostrarweb();
}

window.eliminarweb = eliminarWeb;

window.editarLibro = (id, nombre, pagina, tema, ejemplo) => {
  webForm.nombre.value = nombre;
  webForm.pagina.value = pagina;
  webForm.tema.value = tema;
  webForm.ejemplo.value = ejemplo;

  libroForm.onsubmit = async (e) => {
    e.preventDefault();
    const nuevoNombre = webForm.nombre.value;
    const nuevoPagina = webForm.pagina.value;
    const nuevoTema = parseInt(webForm.tema.value);
    const nuevoEjemplo = webForm.ejemplo.value;

    await updateDoc(doc(db, 'libros', id), {
      titulo: nuevoNombre,
      autor: nuevoPagina,
      anio: nuevoTema,
      genero: nuevoEjemplo
    });

    webForm.reset();
    webForm.onsubmit = guardarWeb;
    mostrarWeb();
  };
};

function guardarWeb(e) {
  e.preventDefault();
  // Se reemplaza dinámicamente con función anterior al editar
}

async function buscarLibro() {
  const texto = buscarInput.value.trim();
  if (!texto) return mostrarWeb();

  listaWeb.innerHTML = '';
  const q = query(webRef, where('nombre', '==', texto));
  const resultado = await getDocs(q);

  resultado.forEach(docSnap => {
    const libro = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `<strong>${web.nombre}</strong> - ${web.pagina} (${libro.tema}) - ${web.ejemplo}`;
    listaLibros.appendChild(div);
  });
}

mostrarweb();
