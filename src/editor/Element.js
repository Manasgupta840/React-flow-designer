const Element = ({ attributes, children, element }) => {
  if (element.type === "expression") {
    return (
      <span {...attributes} style={{ background: "#EEF2FF" }}>
        <span contentEditable={false}>{"{{"}</span>
        {children}
        <span contentEditable={false}>{"}}"}</span>
      </span>
    );
  }
  return <p {...attributes}>{children}</p>;
};

export default Element;
