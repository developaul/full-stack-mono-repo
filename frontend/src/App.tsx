import { ChangeEvent, useState } from 'react'
import './App.css'
import { Toaster, toast } from 'sonner'

function App() {
  const [file, setFile] = useState<File | null>(null)

  console.log("🚀 ~ App ~ file:", file)

  const uploadFile = () => {
    // Upload file
  }

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []

    if (!file) toast.error('El archivo es requerido')

    setFile(file)
  }

  return (
    <>
      <Toaster />
      <form onSubmit={uploadFile}>
        <div className="file-input">
          <label>Seleccionar archivo:</label>
          <input onChange={handleSelectFile} type="file" accept='.csv' />
        </div>
        <button type='submit'>
          Subir archivo
        </button>
      </form>
    </>
  )
}

export default App
