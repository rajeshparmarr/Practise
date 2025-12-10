import { useState } from "react";
import "./App.css";

const imagesArr = [
  "https://picsum.photos/1",
  "https://picsum.photos/002",
  "https://picsum.photos/202",
  "https://picsum.photos/203",
  "https://picsum.photos/204",
];

function App() {
    const [selectedImage,setSelectedImage] = useState(null)
    
    const onClickHandler = (image) => {
        setSelectedImage(image);
    }

  return (
    <>
      <div className="m-5 text-center">
        <p className="underline">Image Gallery</p>

        <div className="flex flex-wrap gap-5 justify-center">
          {imagesArr.map((img, index) => (
            <div
              key={index}
                  className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110" onClick={() => {
                  onClickHandler(img)
              }}
            >
              <img
                src={img}
                className="w-[200px] h-[200px] object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <h2 className="mb-2 text-xl">Selected Image</h2>
          <img
            src={selectedImage}
            className="max-w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
      ;
    </>
  );
}

export default App;
