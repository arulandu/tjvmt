export const TextArea = ({id, label, value, onChange, className=''}) => {
  return (
    <>
    <textarea id={id} name={id} value={value} onChange={onChange} className={`${className} bg-transparent text-white outline-none resize-none`}/>
    </>
  );
}