export function setButtonText(
  button = evt.submitter,
  isLoading,
  defaultText,
  loadingText
) {

  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = defaultText;
  }
}