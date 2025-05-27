export const handleInputChange = (e, input, setInput) => {
  const target = e.target
  const val = target.type == 'checkbox' ? target.checked : target.value
  const name = target.name

  //@ts-ignore
  setInput({
    ...input,
    [name]: val
  })
}