/* import React, { useState } from "react";
import TagInput from "../../components/Navbar/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData.title || "");
  const [content, setContent] = useState(noteData.content || "");
  const [tags, setTags] = useState(noteData.tags || []);
  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.message) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("title is required");
      return;
    }
    if (!content) {
      setError("content is required");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className='relative'>
      <button
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500'
        onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input
          type='text'
          className='text-2xl text-slate-950 outline-none  bg-slate-200'
          placeholder='Gym at 8'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
          type='text'
          className='text-sm text-slate-950 outline:none bg-slate-200 p-2 rounded'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className='mt-3'>
        <TagInput tags={tags} setTags={setTags} />
        <label className='input-label'>TAGS</label>
      </div>
      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

      <button
        className='btn-primary font-medium mt-5 p-3'
        onClick={handleAddNote}>
        {type === "edit" ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;
 */

/* import React, { useState } from "react";
import TagInput from "../../components/Navbar/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData.noteId;

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className='relative'>
      <button
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500'
        onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input
          type='text'
          className='text-2xl text-slate-950 outline-none  bg-slate-200'
          placeholder='Gym at 8'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
          type='text'
          className='text-sm text-slate-950 outline:none bg-slate-200 p-2 rounded'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className='mt-3'>
        <TagInput tags={tags} setTags={setTags} />
        <label className='input-label'>TAGS</label>
      </div>
      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

      <button
        className='btn-primary font-medium mt-5 p-3'
        onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes; */







import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Bounce } from "react-toastify"; // Import Bounce transition

const AddEditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success('Note added successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce, // Correct way to pass the transition component
        });
        
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        toast.success('Note edited successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce, // Correct way to pass the transition component
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className='relative'>
      <button
        className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500'
        onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input
          type='text'
          className='text-2xl text-slate-950 outline-none  bg-slate-200'
          placeholder='Gym at 8'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
          type='text'
          className='text-sm text-slate-950 outline:none bg-slate-200 p-2 rounded'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className='mt-3'>
        <TagInput tags={tags} setTags={setTags} />
        <label className='input-label'>TAGS</label>
      </div>
      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

      <button
        className='btn-primary font-medium mt-5 p-3'
        onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;

