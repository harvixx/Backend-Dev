import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const App = () => {
  const [lastNoteDet, setlastNoteDet] = useState({
    id: "",
    title: "",
    Desc: ""
  });

  const [toggleUpdate, settoggleUpdate] = useState(false)
  const [Notes, setNotes] = useState([]);

  const handleEditClick = (id, title, Desc) => {
    settoggleUpdate(true);    // panel open
    setlastNoteDet({ id, title, Desc })
  };

  function fetchNotes() {
    axios.get("/api/notes")
      .then((res) => {
        setNotes(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    fetchNotes()
  }, [])

  async function createNotes(e) {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const Desc = e.target.Desc.value.trim();

    if (!title || !Desc) {
      alert("Title aur Description dono bhar bhai 🙂");
      return;
    }

    const data = { title, Desc };

    try {
      await axios.post("/api/notes", data);

      // form reset
      e.target.reset();

      // yaha baad me notes re-fetch kar sakta hai
    } catch (err) {
      console.error("Error creating note:", err);
    }
    fetchNotes();
  }

  async function deleteNotes(id) {
    try {
      await axios.delete(`/api/notes/${id}`)
    } catch (err) {
      console.log(err)
    }
    fetchNotes();
  }

  async function patchNotes(e,id) {
    e.preventDefault();
      settoggleUpdate(false)
    const title = e.target.title.value;
    const Desc =e.target.Desc.value;
    const data = {title:title,Desc:Desc};

    try {
      await axios.patch("/api/notes/" + id, data);

      // form reset
      e.target.reset();

      // yaha baad me notes re-fetch kar sakta hai
    } catch (err) {
      console.error("Error creatinag note:", err);
    }
    fetchNotes();
  }


  return (
    <div className='relative'>
      <div className="bg-amber-600 text-neutral-800 text-4xl font-bold p-2">
        Your NoteApplication
      </div>

      {toggleUpdate &&
        <div className="h-[91vh] absolute w-screen backdrop-blur-[2px] z-40 flex items-center justify-center">
          <form onSubmit={(e)=>{
            patchNotes(e,lastNoteDet.id)
          }} className="px-10 py-6 flex flex-col gap-2.5 border-2 border-orange-400 rounded-2xl items-center justify-center">
            <h1 className='text-orange-400 text-2xl'>Update Note</h1>
            <input name='title' defaultValue={lastNoteDet.title} className='text-neutral-200 border-2 border-neutral-600 rounded-lg' type="text" placeholder='Enter title' />
            <input name='Desc' defaultValue={lastNoteDet.Desc} className='text-neutral-200 border-2 border-neutral-600 rounded-lg' type="text" placeholder='Enter description' />
            <div className="flex items-center justify-center w-full gap-1.5">
              <div onClick={() => {
                settoggleUpdate(false)
              }} className="rounded-xl p-1 border-2 text-neutral-300 border-orange-400 select-none cursor-pointer">Cancel</div>
              <button className=' rounded-xl p-1 border-none bg-orange-400'>Update</button>
            </div>

          </form>
        </div>}
      <form onSubmit={createNotes}
        className='flex items-center p-2 gap-1 justify-center text-white' action="">
        <input required minLength={3} className='text-white p-1 border-2 border-neutral-400 rounded-lg ' name='title' type="text" placeholder='Enter Note Title' />
        <input required minLength={5} className='text-white p-1 border-2 border-neutral-400 rounded-lg ' name='Desc' type="text" placeholder='Enter Note description' />
        <button className='px-3 py-1 rounded-lg bg-orange-400 text-neutral-800'>Add</button>
      </form>
      <div className="text-white
    columns-1
    sm:columns-2
    md:columns-3
    lg:columns-4
    gap-3
    p-3">
        {Notes.map((e) => (
          <div
            key={e._id}
            className="  relative group break-inside-avoid
      bg-neutral-800
      border border-neutral-700
      rounded-2xl
      p-4
      mb-3
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      hover:scale-102
      active:scale-98
      select-none
      cursor-auto "
          >
            <i onClick={() => {
              deleteNotes(e._id)
            }} title='Remove' className="cursor-pointer ri-close-line absolute right-2 top-2 text-white
    opacity-0 scale-0
    transition-all duration-100
    group-hover:opacity-100 group-hover:scale-100 active:scale-90"></i>
            <i onClick={() => {
              handleEditClick(e._id, e.title, e.Desc)
            }} title='Remove' className="cursor-pointer ri-pencil-line absolute right-2 bottom-2 text-white
    opacity-0 scale-0
    transition-all duration-100
    group-hover:opacity-100 group-hover:scale-100 active:scale-90"></i>
            <h1 className="text-xl md:text-2xl text-orange-400 font-semibold mb-2">
              {e.title}
            </h1>

            <p className="text-sm md:text-base text-neutral-200 leading-relaxed wrap-break-word">
              {e.Desc}
            </p>
          </div>
        ))}
      </div>


    </div>
  )
}

export default App