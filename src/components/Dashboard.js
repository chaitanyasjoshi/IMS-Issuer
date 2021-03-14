import React, { Component } from 'react';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleDocNameChange = this.handleDocNameChange.bind(this);
    this.addField = this.addField.bind(this);
    this.removeField = this.removeField.bind(this);
    this.issueDocument = this.issueDocument.bind(this);
    this.state = {
      formData: [],
      templateData: [],
      ownerAddress: '',
      documentName: '',
    };
  }

  handleInputChange(event, index) {
    const formData = [...this.state.formData];
    formData[index].fieldValue = event.target.value;
    this.setState({ formData });
  }

  handleOwnerChange(event) {
    const ownerAddress = event.target.value;
    this.setState({ ownerAddress });
  }

  handleDocNameChange(event) {
    const documentName = event.target.value;
    this.setState({ documentName });
  }

  addField() {
    const formData = [...this.state.formData];
    const templateData = [...this.state.templateData];

    const label = prompt('Enter field name');
    if (label) {
      const field = {
        fieldLabel: label,
        fieldValue: '',
      };

      formData.push(field);
      templateData.push({ label });
      this.setState({ formData, templateData });
    }
  }

  removeField(index) {
    const formData = [...this.state.formData];
    const templateData = [...this.state.templateData];
    formData.splice(index, 1);
    templateData.splice(index, 1);
    this.setState({ formData, templateData });
  }

  issueDocument() {
    try {
      this.props.contract.methods
        .issueDocument(
          this.state.documentName,
          JSON.stringify(this.state.formData),
          this.state.ownerAddress
        )
        .send({ from: this.props.user }, (err, txnHash) => {
          if (err) {
            alert(`Transaction signature denied`);
          }
        });

      this.props.contract.methods
        .createTemplate(
          this.state.documentName,
          JSON.stringify(this.state.templateData)
        )
        .send({ from: this.props.user }, (err, txnHash) => {
          if (err) {
            alert(`Transaction signature denied`);
          }
        });

      const formData = [];
      const templateData = [];
      const ownerAddress = '';
      const documentName = '';
      this.setState({ formData, templateData, ownerAddress, documentName });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className='mt-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 font-Poppins'>
        <div className='mt-10 sm:mt-0'>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <div className='shadow overflow-hidden sm:rounded-md'>
              <div className='px-4 py-5 bg-white sm:p-6'>
                <div className='grid grid-cols-9 gap-6'>
                  <div className='col-span-9 sm:col-span-3'>
                    <label
                      htmlFor='issuerAddress'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Issuer address
                    </label>
                    <input
                      type='text'
                      name='issuerAddress'
                      id='issuerAddress'
                      autoComplete='off'
                      disabled
                      value={this.props.user}
                      className='mt-1 cursor-not-allowed disabled:opacity-60 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <div className='col-span-9 sm:col-span-3'>
                    <label
                      htmlFor='ownerAddress'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Owner address
                    </label>
                    <input
                      type='text'
                      name='ownerAddress'
                      id='ownerAddress'
                      autoComplete='off'
                      required
                      onChange={this.handleOwnerChange}
                      value={this.state.ownerAddress}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-9 sm:col-span-3'>
                    <label
                      htmlFor='documentName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Document name
                    </label>
                    <input
                      type='text'
                      name='documentName'
                      id='documentName'
                      autoComplete='off'
                      required
                      onChange={this.handleDocNameChange}
                      value={this.state.documentName}
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  {this.state.formData.map((field, i) => (
                    <div key={i} className='col-span-9 sm:col-span-3'>
                      <label
                        htmlFor={`${field.fieldLabel.replace(/\s/g, '')}`}
                        className='block text-sm font-medium text-gray-700'
                      >
                        {field.fieldLabel}
                      </label>
                      <div className='flex'>
                        <input
                          type={`${
                            field.fieldLabel.toLowerCase().includes('date')
                              ? 'date'
                              : 'text'
                          }`}
                          name={`${field.fieldLabel.replace(/\s/g, '')}`}
                          id={`${field.fieldLabel.replace(/\s/g, '')}`}
                          autoComplete='off'
                          required
                          onChange={(event) => {
                            this.handleInputChange(event, i);
                          }}
                          value={this.state.formData[i].fieldValue}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                        <button
                          name='delete'
                          id='delete'
                          onClick={() => {
                            this.removeField(i);
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
                  ))}

                  <div className='mt-6 col-span-7 sm:col-span-4'>
                    <button
                      name='addField'
                      id='addField'
                      onClick={this.addField}
                      className='flex items-center p-2 pr-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      <svg
                        className='h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                      Add another field
                    </button>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-100 text-right sm:px-6'>
                <button
                  onClick={this.issueDocument}
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Issue document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
