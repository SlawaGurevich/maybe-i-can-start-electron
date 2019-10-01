import React from 'react';

const Avatar = ( props ) => {
	return props.name.split(" ").map( (s) => { return s.charAt(0).toUpperCase() } ).join("");
}

export default Avatar;