export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/5519995679592"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        background: "#25D366",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        zIndex: 9999,
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        width="32"
      />
    </a>
  );
}
