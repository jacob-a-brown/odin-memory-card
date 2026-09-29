function Card({ name, imageUrl, onCardSelect }){

  return (
    <div className="card" id={name} onClick={onCardSelect}>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  )

}

export default Card;