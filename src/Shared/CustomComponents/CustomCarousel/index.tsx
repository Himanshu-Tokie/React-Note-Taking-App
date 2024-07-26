import Masonry from 'react-masonry-css';

export default function Carousel({ imageList }: { imageList: string[] }) {
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
      {/* {imageList.map((item, index) => (
        <div key={index} className="masonry-item">
          <img src={item} alt="" />
        </div>
      ))} */}
    </Masonry>
  );
}
