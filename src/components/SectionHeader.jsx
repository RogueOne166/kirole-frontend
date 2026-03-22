function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-title-block">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default SectionHeader;
