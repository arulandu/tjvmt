export const Dropdown = ({ id, label, options, value, onChange, className=''}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className='text-white text-xl'>{label}</label>
      <select id={id} name={id} value={value} onChange={onChange} className='ml-2'>
        {options.map((op, i) => <option key={i} value={op.value}>{op.label}</option>)}
      </select>
    </div>
  );
}