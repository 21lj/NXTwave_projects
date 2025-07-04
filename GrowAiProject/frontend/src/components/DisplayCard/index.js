import './index.css';

const DisplayCard = ({data, setBusinessData, setIsLoading}) => {

    const regenerateHeadlineFun = async () => {
        setIsLoading(true);
        const URL = `http://localhost:3001/regenerate-headline?name=${data.name}&location=${data.location}`
        const res = await fetch(URL)
        const newData = await res.json()
        setBusinessData({...data, headline: newData.headline})
        setIsLoading(false);
    };

    return (
    <div className="card">
      <p><strong>Rating:</strong> {data.rating} ⭐</p>
      <p><strong>Reviews:</strong> {data.reviews}</p>
      <p><strong>Headline:</strong> <em>{data.headline}</em></p>
      <button onClick={regenerateHeadlineFun}>Regenerate SEO Headline</button>
    </div>
  );
}

export default DisplayCard;