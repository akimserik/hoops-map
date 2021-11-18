import React, { useState, useEffect, useRef, useContext } from "react"; //

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Trash } from "react-bootstrap-icons";

import { Context } from "../index";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface Props {
  addNewHoop: Function;
  backToList: Function;
  coords: Number[];
}

const FormNewHoops = (props: Props) => {
  const [hoopName, setHoopName] = useState("");
  const [hoopLocation, setHoopLocation] = useState("");
  const [hoopImages, setHoopImages] = useState<any[]>([]);
  const [hoopImagesURLs, setHoopImagesURLs] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { storage } = useContext(Context);

  const onAddClick = async (e: React.FormEvent) => {
    e.preventDefault();
    props.addNewHoop({ hoopName, hoopLocation, hoopImagesURLs });
  };

  const onFileInput = async (e: any) => {
    if (e.target.files) {
      setHoopImages((prevState) => [...prevState, ...e.target.files]);
      const res = await uploadImagesPrepareURLs([...e.target.files]);
      setHoopImagesURLs(res);
    }
  };

  const onImageDelete = (e: any, index: number) => {
    setHoopImages((prevState) => prevState.filter((el, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
    deleteFileFromStorage(hoopImages[index].name);
  };

  const deleteFileFromStorage = (fileName: string) => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, `images/${fileName}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log(`File ${fileName} was deleted`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadImagesPrepareURLs = async (images: any[]) => {
    const arrRes: any[] = [];
    images.forEach(async (image) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      arrRes.push({ name: image.name, url });
    });
    return arrRes;
  };

  const backToList = (e: React.MouseEvent) => {
    e.preventDefault();

    hoopImages.forEach((image, index) => {
      deleteFileFromStorage(hoopImages[index].name);
    });

    props.backToList();
  };

  useEffect(() => {
    if (props.coords.length > 0) setHoopLocation(props.coords.join(","));
  }, [props.coords]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gridGap: "5px",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        {hoopImages.map((image, index) => {
          return (
            <div
              key={index}
              style={{
                padding: "3px",
                border: "1px solid #eee",
                textAlign: "center",
                position: "relative",
              }}
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`img${index}`}
                width={210}
                height={140}
                className="d-block w-90"
                style={{ objectFit: "contain" }}
              />
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Удалить</Tooltip>}
              >
                <button
                  style={{
                    borderRadius: "50%",
                    border: "none",
                    position: "absolute",
                    bottom: 7,
                    right: 1,
                    backgroundColor: "white",
                  }}
                  onClick={(e) => onImageDelete(e, index)}
                >
                  <Trash />
                </button>
              </OverlayTrigger>
            </div>
          );
        })}
      </div>
      <Form>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Загрузите фото площадки</Form.Label>
          <Form.Control
            ref={fileInputRef}
            size="sm"
            type="file"
            multiple
            onChange={onFileInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupTitle">
          <Form.Label>Придумайте название</Form.Label>
          <Form.Control
            type="text"
            placeholder="Как будет называться площадка?"
            value={hoopName}
            onChange={(e) => setHoopName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupCoordinates">
          <Form.Label>Координаты</Form.Label>
          <Form.Control
            readOnly
            type="text"
            placeholder="кликнете по карте"
            value={hoopLocation}
            onChange={(e) => setHoopLocation(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="secondary"
          type="submit"
          onClick={backToList}
          className="btn-gap"
        >
          Отмена
        </Button>
        <Button variant="primary" type="submit" onClick={onAddClick}>
          Сохранить
        </Button>
      </Form>
    </>
  );
};

export default FormNewHoops;
