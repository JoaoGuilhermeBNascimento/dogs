import React from "react";
import styles from './Image.module.css'
//passamos as propriedades para a imagem, o alt e passamos o props para incluir o source
const Image = ({alt, ...props}) => {
    const [skeleton, setSkeleton] = React.useState(true);

    function handleLoad({target}) {
        setSkeleton(false)
        target.style.opacity = 1;
    }
    
  return (
    <div className={styles.wrapper}>
      { skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img}  alt={alt} {...props} />
    </div>
  );
};

export default Image;
