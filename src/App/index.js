import React, {Component} from 'react';
import styles from './Imageworker.module.css';
import style from './UploaderI.module.css'



const App= () => {
  const [preview, setPreview] = React.useState("");
  const [drop, setDrop] = React.useState(false);
  const [savy, setSavy] = React.useState();
  const reader = new FileReader();
  var tr, tg, tb, ta, tcr, tcg, tcb,tca;
  var width, height;
  var photo, canvas;
  var pix, imgd, context;
  
  const handleOver = (f) => {
    f.preventDefault();
    f.stopPropagation();
    console.log("over!");
  };
  
  const handleUpload = (f) => {
    f.preventDefault();
    f.stopPropagation();
    console.log("drop!");
    setDrop(true);
    
    const [file] = f.target.files || f.dataTransfer.files;
    
    uploadFile(file);
  };
   
  function uploadFile(file) {
    reader.readAsBinaryString(file);
    
    reader.onload = () => {
      // this is the base64 data
      const fileRes= btoa(reader.result);
      console.log(`data:image/jpg;base64,${fileRes}`);
      setPreview(`data:image/jpg;base64,${fileRes}`);
      setSavy(fileRes);
    };
    
    reader.onerror = () => {
      console.log("There is a problem while uploading...");
    };
  }
  
  


  const negate = () => {
    console.log("negate", savy)
    var reWork = savy;
    
    // setPreview(`data:image/jpg;base64,${fileRes}`);
    var x = 0, y = 0;
    for(x = 0; x < reWork.width; x++){
      for(y = 0; y < reWork.height; y++){
        
        reWork.r[x][y] = 255 - reWork.r[x][y];
        reWork.g[x][y] = 255 - reWork.g[x][y];
        reWork.b[x][y] = 255 - reWork.b[x][y];
        
      }
    }
    console.log("negate after", `data:image/jpg;base64,${reWork}`);
    var x = 0, y = 0;
    for(x = 0; x < reWork.width; x++) {
      for(y = 0; y < reWork.height ; y++) {
        
        // D'après la formule de conversion RGB vers HSL disponible sur www.rapidtables.com/convert/color/rgb-to-hsl.html
        var rBis = reWork.r[x][y] / 255;
        var gBis = reWork.g[x][y] / 255;
        var bBis = reWork.b[x][y] / 255;
        var cMax = Math.max(rBis, gBis, bBis);
        var cMin = Math.min(rBis, gBis, bBis);
        var delta = cMax - cMin;
        
        if(delta === 0){
          reWork.h[x][y] = 0;
          setPreview(`data:image/jpg;base64,${reWork}`);
        } else if (cMax === rBis) {
          reWork.h[x][y] = 60 * (((gBis - bBis) / delta) % 6);
          setPreview(`data:image/jpg;base64,${reWork}`);
        } else if (cMax === gBis) {
          reWork.h[x][y] = 60 * (((bBis - rBis) / delta) + 2);
          setPreview(`data:image/jpg;base64,${reWork}`);
        } else if (cMax === bBis) {
          reWork.h[x][y] = 60 * (((rBis - gBis) / delta) + 4);
          setPreview(`data:image/jpg;base64,${reWork}`);
        }
        
        reWork.l[x][y] = (cMax + cMin) / 2;
        
        if(delta === 0){
          reWork.s[x][y] = 0;
          setPreview(`data:image/jpg;base64,${reWork}`);
        } else if(delta < 0 || delta > 0) {
          reWork.s[x][y] = delta / (1 - Math.abs((2 * reWork.l[x][y]) - 1));
          setPreview(`data:image/jpg;base64,${reWork}`);
        }
        setPreview(`data:image/jpg;base64,${reWork}`);
      }
    }
    setPreview(`data:image/jpg;base64,${reWork}`);
    console.log("rgb after", `data:image/jpg;base64,${reWork}`);
  }
  
  
  return (
    <div>
    <>
    <div className={styles.order}>
    <div className={styles.board}>
    <button id="negatif" onClick={() => negate()} ><p>Negatif</p></button>
    <button id="effect"  ><p>effect</p></button>
    <button id="effect"  ><p>effect</p></button>
    <button id="effect"  ><p>effect</p></button>
    <button id="effect"  ><p>effect</p></button>
    </div>
    <div className={styles.framer}>
    <div 
    onDragOver={(f) => handleOver(f)}
    onDrop={(f) => handleUpload(f)}
    className={styles.frame}>
    <form class="my-form">
    {!drop && (
      <p>Drag and Drop image here</p>
      )}
      
      <img src={preview} width="300px" alt=""/>
      <canvas id="elCanvas"></canvas>
      
      
      </form>
      </div>
      </div>
      </div>
      </>
      
      
      <>
      <div className={style.uploadButton}>
      <button className={style.button}>Upload new file here 
      <input
      type="file"
      className={style.uploadFile}
      accept="image/*"
      onChange={(f) => handleUpload(f)}
      />
      </button>
      
      
      </div></>
      
      </div>
      )
    }
    
    export default App;
    