/**
 * A reusable CTA button component.
 * When clicked, it scrolls smoothly to the section with ID "counter",
 * with a small offset from the top for better visual placement.
 * Now supports custom onClick function for additional functionality.
 */

const Button = ({ text, className, id, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Stop the link from jumping instantly

    // If there's a custom onClick function, call it first
    if (onClick) {
      onClick(e);
    }

    // Only scroll if we found the section and an ID is passed in
    // that prevents the contact button from scrolling to the top
    if (id) {
      const target = document.getElementById(id);
      
      if (target) {
        const offset = window.innerHeight * 0.15; // Leave a bit of space at the top

        // Calculate how far down the page we need to scroll
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        // Scroll smoothly to that position
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <a
      onClick={handleClick}
      className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;