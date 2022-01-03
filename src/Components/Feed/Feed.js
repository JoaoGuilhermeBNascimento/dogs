import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

const Feed = () => {
  //criamos um estado reativo para a foto
  const [modalPhoto, setModalPhoto] = React.useState(null);
  return (
    //Só vamos mostrar o FeedModal se o modalPhoto existir
    //Quando clicarmos no item queremos que seja modificado o setModalPhoto,
    <section>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      <FeedPhotos setModalPhoto={setModalPhoto} />
    </section>
  );
};

export default Feed;
