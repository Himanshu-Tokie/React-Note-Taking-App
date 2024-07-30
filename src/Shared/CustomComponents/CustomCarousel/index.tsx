import Masonry from 'react-masonry-css';
import { useSelector } from 'react-redux';
import ICONS from '../../../assets';
import { deletePhotos } from '../../Firebase Utils';
import { stateType } from '../../../Views/Dashboard/types';

export default function Carousel({
  imageList,
  noteId,
  setCachedImage,
  setCachedImageURL,
}: {
  imageList: string[];
  noteId: string;
  setCachedImage?: (val: File[] | ((val: File[]) => File[])) => void;
  setCachedImageURL?: (val: string[] | ((val: string[]) => string[])) => void;
}) {
  // const numberOfImageInColoumn = Math.ceil(images.length / 3);
  // function splitArrayIntoGroups(arr, groupSize) {
  //   let result = [];
  //   for (let i = 0; i < arr.length; i += groupSize) {
  //     result.push(arr.slice(i, i + groupSize));
  //   }
  //   return result;
  // }
  // const f = splitArrayIntoGroups(images, numberOfImageInColoumn);
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };
  const uid = useSelector((state: stateType) => state.common.uid);
  const handleDelete = (item: string, index: number) => {
    if (setCachedImage && setCachedImageURL) {
      setCachedImage((val: File[]) => {
        const updatedVal = [...val];
        updatedVal.splice(index, 1);
        return updatedVal;
      });
      setCachedImageURL((val: string[]) => {
        const updatedVal = [...val];
        updatedVal.splice(index, 1);
        return updatedVal;
      });
    } else {
      deletePhotos(item, uid, noteId);
    }
  };
  return (
    // <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
    //   {f.map((imageColumn) => {
    //     return (
    //       <div className="grid gap-2">
    //         {imageColumn.map((image) => {
    //           return (
    //             <div>
    //               <img
    //                 className="h-auto max-w-full rounded-lg"
    //                 src={image}
    //                 alt=""
    //               />
    //             </div>
    //           );
    //         })}
    //       </div>
    //     );
    //   })}
    // </div>
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {imageList.map((item, index) => (
        <div key={item} className="relative">
          <div className="masonry-item">
            <img src={item} alt="" />
          </div>
          <div className="absolute bottom-0 right-0">
            <button
              type="button"
              onClick={() => handleDelete(item, index)}
              aria-label="delete photo"
            >
              <img src={ICONS.DELETE} alt="noteImage" />
            </button>
          </div>
        </div>
      ))}
    </Masonry>
  );
}

Carousel.defaultProps = {
  setCachedImage: undefined,
  setCachedImageURL: undefined,
};
