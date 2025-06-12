export const TabSelect = ({ id, options, value, onChange, className = '' }) => {
  return (
    <div id={id} onChange={onChange} className={`flex justify-center w-fit mx-auto ${className}`}>
      {options.map((op, i) => 
        <button key={i} value={op.value} onClick={() => onChange(op.value)} className={`block text-white bg-navy-light border-solid border-b-2 ${value == op.value ? 'bg-opacity-100 border-white ' : 'bg-opacity-50 border-transparent'} py-2 px-4 transition-all duration-1000`}>{op.label}</button>
      )}
    </div>
  );
}