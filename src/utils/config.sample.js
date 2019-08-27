import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

// Put your team roles and the appropriate icons here
const roles = {
	dev: { name: "dev", icon: Icons.faTerminal },
}

// Put your team members here
const members = [
	{ "id": 1, "name": "Slawa", "role": roles.dev },
];

// set the options here
const settings = {
	animationScale: 1, // how fast should the animation run (should be between 1 and 3)
}

export default members;