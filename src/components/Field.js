import React from 'react';

export default function Field(props) {
  return (
    <div className='col-span-9 sm:col-span-3'>
      <label
        htmlFor={`${props.field.fieldLabel.replace(/\s/g, '')}`}
        className='block text-sm font-medium text-gray-700'
      >
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
          id={`${props.field.fieldLabel.replace(/\s/g, '')}`}
          autoComplete='off'
          required
          onChange={(event) => {
            props.handleInputChange(event, props.index);
          }}
          value={props.value}
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
        />
        <button
          name='delete'
          id='delete'
          onClick={() => {
            props.removeField(props.index);
          }}
          className='ml-6 mt-1 p-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <svg
            className='h-6 w-6 sm:h-5 sm:w-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
