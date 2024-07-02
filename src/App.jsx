import { ref, uploadBytes } from "firebase/storage";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function App() {
  const [movieList, setMovieList] = useState([]);

  // FILE UPLOAD STATES
  const [fileUpload, setFileUpload] = useState(null);

  // NEW MOVIE STATES
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

  // UPDATE TITLE STATES
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  async function getMovieList() {
    // READ THE DATA FROM THE DB
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function onSubmitMovie() {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userID: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteMovie(id) {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.error(error.message);
    }
  }

  async function updateMovieTitle(id) {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  }

  async function uploadFile() {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (e) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    // getMovieList();
    getMovieList();
  }, []);

  return (
    <div className="app">
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(e) => setNewReleaseDate(e.target.value)}
        />
        <input
          type="checkbox"
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          checked={isNewMovieOscar}
        />
        <label>Received an oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => {
          return (
            <div key={movie.id}>
              <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
                {movie.title}
              </h1>
              <p>Date: {movie.releaseDate}</p>
              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>

              <input
                type="text"
                placeholder="new title"
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateMovieTitle(movie.id)}>
                Update Title
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}
