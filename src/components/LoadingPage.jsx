import "../styles/loadingPage.css";

export default function LoadingPage({ classChange, src, srcName }) {
  return (
    <>
      <div className={`loading-container ${classChange}`}>
        <img className="loading-image" src={src} alt={srcName} />
        <p className="loading-text">LOADING</p>
      </div>
    </>
  );
}
