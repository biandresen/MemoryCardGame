export default function BackgroundVideo({ src }) {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
