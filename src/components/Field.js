import { ReactComponent as Delete } from '../assets/icons/delete.svg';

export default function Field(props) {
  return (
    <div className='col-span-9 sm:col-span-3'>
      <label className='block text-sm font-medium text-gray-700'>
        {props.field.fieldLabel}
        <span className='text-red-500'>*</span>
      </label>

      <div className='flex'>
        <input
          type={`${
            props.field.fieldLabel.toLowerCase().includes('date')
              ? 'date'
              : 'text'
          }`}
          name={`${props.field.fieldLabel.replace(/\s/g, '')}`}
          autoComplete='off'
          onChange={(event) => {
            props.handleInputChange(event, props.index);
          }}
          value={props.value}
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        />
        <button
          name='delete'
          onClick={() => {
            props.removeField(props.index);
          }}
          className='ml-6 mt-1 p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <Delete className='h-6 w-6 sm:h-5 sm:w-5' />
        </button>
      </div>
    </div>
  );
}
