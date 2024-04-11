export function createWrapperAndAppendToBody(
  wrapperId: string,
  className?: string,
) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  wrapperElement.className = className ?? "";
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
