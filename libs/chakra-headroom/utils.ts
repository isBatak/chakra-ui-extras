export const getScrollY = (root) => {
  if (root.pageYOffset !== undefined) {
    return root.pageYOffset;
  } else if (root.scrollTop !== undefined) {
    return root.scrollTop;
  } else {
    return (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollTop;
  }
};

getViewportHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

getDocumentHeight = () => {
  const body = document.body;
  const documentElement = document.documentElement;

  return Math.max(
    body.scrollHeight,
    documentElement.scrollHeight,
    body.offsetHeight,
    documentElement.offsetHeight,
    body.clientHeight,
    documentElement.clientHeight
  );
};

getElementPhysicalHeight = (elm) =>
  Math.max(elm.offsetHeight, elm.clientHeight);

getElementHeight = (elm) =>
  Math.max(elm.scrollHeight, elm.offsetHeight, elm.clientHeight);

getScrollerPhysicalHeight = () => {
  const parent = this.props.parent();

  return parent === window || parent === document.body
    ? this.getViewportHeight()
    : this.getElementPhysicalHeight(parent);
};

getScrollerHeight = () => {
  const parent = this.props.parent();

  return parent === window || parent === document.body
    ? this.getDocumentHeight()
    : this.getElementHeight(parent);
};
