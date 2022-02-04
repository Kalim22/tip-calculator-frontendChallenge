import React, { useState } from 'react';
import Result from './Result';
import './Card.css';

function Card() {

  const [list] = useState([5, 10, 15, 25, 50]);
  const [percentage, setPercentage] = useState('');
  const [error, setError] = useState({});
  const [bill, setBill] = useState({});

  const [text, setText] = useState({
    billAmount: "",
    numberOfPeople: "",
    custom: ""
  })

  const handleChange = e => {
    setText({
      ...text, [e.target.name]: e.target.value
    })
  }

  const selectPercentageValue = i => {
    setPercentage(list[i]);
    setError(i)
  }

  const calculateBill = e => {
    if(e.key === 'Enter'){
      if(e.target.value === '' || e.target.value === 0){
        setError(() => {
          const border = '3px solid #f00';
          const errorMsg = `can't be zero`;
          return {border, errorMsg}
        });
        setTimeout(() => {
          setError({})
        }, 1500);
      }else{
        setBill(() => {
          const tipAmount = ((+text.billAmount) * ((+percentage) || (+text.custom)) / 100)
          const splitTipAmount = (tipAmount / (+text.numberOfPeople)).toFixed(2);
          const splitAmount = ((tipAmount + (+text.billAmount)) / (+text.numberOfPeople)).toFixed(2)
          return {splitTipAmount, splitAmount}
        })
        setPercentage(!percentage)
      }
    }
  }

  const reset = () => {
    setText({
      billAmount: '',
      custom: '',
      numberOfPeople: ''
    });
    setBill('');
    setError('percentage');
    setPercentage('var(--Dark-grayish-cyan)')
  }
  
  return(
    <>
      <main>
      <h1>SPIL<br></br>TIER</h1>
        <section>
          <div className='tip-calculator'>
            <form onKeyPress={calculateBill} action="/">
              <div className='input-form'>
                <label htmlFor='bill'>Bill</label>
                <input
                type='text'
                name='billAmount'
                id='bill'
                onChange={handleChange}
                value={text.billAmount}
                placeholder='0'
                required/>
              </div>
              <div className='percentage-box'>
                <div className='heading'>Select Tip %</div>
                <div className='percentage-value'>
                  { 
                    list.map((ele, idx) => {
                      return(
                        <div
                        key={idx}
                        className={error === idx ? 'selected-box' : 'percentage'}
                        onClick={() => selectPercentageValue(idx)}>
                          {`${ele}%`}
                        </div>
                        )
                      })
                    }
                    <input
                    type='text'
                    name='custom'
                    onChange={handleChange}
                    value={text.custom}
                    placeholder='Custom'
                    required />
                  </div>
              </div>
              <div className='number'>
                  <div className='label-heading'>
                    <label
                    htmlFor='number-of-people'>
                      Number of people
                    </label>
                    <div className='error-msg'>{error.errorMsg}</div>
                  </div>
                  <input
                  type='text'
                  id='number-of-people'
                  name='numberOfPeople'
                  onChange={handleChange}
                  value={text.numberOfPeople}
                  style={{border: error.border}}
                  placeholder='0'
                  required />
              </div>
            </form>
          </div>
          <Result bill={bill} reset={reset} percentage={percentage}/>
        </section>
      </main>
    </>
  )
}

export default Card;