import * as Icons from '@fortawesome/free-solid-svg-icons';

const roles = {
	dev: { name: "dev", icon: Icons.faTerminal },
	designer: { name: "designer", icon: Icons.faPalette }
}

const members = [
	{ "id": 1, "name": "Sven", "role": roles.dev },
	{ "id": 2, "name": "Rocket", "role": roles.dev },
	{ "id": 3, "name": "Leonardo", "role": roles.dev },
	{ "id": 4, "name": "Otto", "role": roles.dev },
	{ "id": 5, "name": "Ron", "role": roles.dev },
	{ "id": 6, "name": "Thomas", "role": roles.dev },
];

const settings = {
	animationScale: 1,
}

export default members;
export { settings }