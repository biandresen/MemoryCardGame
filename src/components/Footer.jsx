import "../styles/footer.css";

export default function Footer() {
  return (
    <footer>
      <p class="copyright-text">
        © 2024 Birger Andresen
        <a
          href="https://github.com/biandresen"
          target="_blank"
          rel="noopener"
          aria-label="GitHub Profile"
        >
          <i class="fab fa-github"></i>
        </a>
      </p>
    </footer>
  );
}
