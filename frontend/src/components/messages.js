import React from 'react'

export const showErrormsg =  (msg) => {
     return(
        <div className = 'alert alert-danger' role = 'alert'>
          {msg}
            
        </div>
        )
    
};

export const showSuccessmsg =  (msg) => {
    return(

    <div className = 'alert alert-success' role = 'alert'>
      {msg}
        
    </div>
)
};

export const showLoadingMsg = (msg) => {
  return(
       <>
                  <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
       </>
  )
}


