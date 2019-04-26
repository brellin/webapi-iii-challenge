import React from 'react'

const UserSelector = props => {
    return (
        <option className='selector' value={props.user.id} name={props.user.name}>
            {props.user.name}
        </option>
    )
}

export default UserSelector
