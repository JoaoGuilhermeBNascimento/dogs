import React from 'react'

const Error = ({error}) => {
    //caso houver erro ele vai definir as cores e a margin ao erro 
    if (!error) return null;

    return (
        <p style={{color: '#f31', margin: '1rem 0'}}>
            {error}
        </p>
    )
}

export default Error
