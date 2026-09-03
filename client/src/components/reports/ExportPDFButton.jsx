function ExportPDFButton({ label = 'Export as PDF' }) {
  const handleExport = () => {
    window.print();
  };

  return (
    <button
      onClick={handleExport}
      className="text-accent hover:opacity-80 text-sm underline underline-offset-2"
    >
      {label}
    </button>
  );
}

export default ExportPDFButton;