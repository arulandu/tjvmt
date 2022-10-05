export const InputField = ({ id, name, value, onChange, className='' }) => {
  let filled = String(value).length > 0;
  let labelClass = filled ? '-top-6 text-sm': 'text-xl top-0 group-focus-within:-top-6 group-focus-within:text-sm';

  return (
    <div className={`relative w-full mt-6 group ${className}`}>
      <label className={`pointer-events-none absolute block transition-all ${labelClass} text-white group-focus-within:text-pink`} htmlFor={name}>{name}</label>
      <input className='w-full pb-2 border-solid border-b-2 border-white text-white bg-transparent transition-all group-focus-within:border-pink' name={id} id={id} value={value} onChange={onChange}></input>
    </div>
  );
}