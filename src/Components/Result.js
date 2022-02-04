import React from 'react';
import './Result.css';

function Result({bill, reset, percentage}) {
  return(
      <>
        <div className='result'>
            <div className='calculation'>
                <div className='tip-amount'>
                  <p>Tip Amount
                    <br></br>
                    <span>/ person</span>
                    </p>
                  <p>
                      {
                        bill.splitTipAmount || `0.00`
                      }
                  </p>
                </div>
                <div className='total'>
                  <p>Total
                    <br></br>
                    <span>/ person</span>
                    </p>
                  <p>
                    {
                      bill.splitAmount || `0.00`
                    }
                  </p>
                </div>
            </div>
            <div className='btn'>
                <button
                type='button'
                onClick={reset}
                style={{backgroundColor:percentage}}
                className={percentage ? 'resetBtn' : 'resetBtn'}>
                  RESET
                </button>
            </div>
        </div>
      </>
  )
}

export default Result;