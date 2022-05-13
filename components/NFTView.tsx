import starIcon from "./icons/star";

const NFTView = ({ name="", creator=""}) => {

  const onFavorite = () => {

  }
  return (
    <div className="rounded-xl bg-gray-200 w-full">
      <img className="rounded-xl w-full" src="key.jpg"></img>
      <div className="px-4 py-2">
        <p className="font-bold"> {name} </p>
        <p> Creator: {creator} </p>
      </div>
    </div>
  )
}

export default NFTView;