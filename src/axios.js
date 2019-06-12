import axios from 'axios';
const instance = axios.create({
	baseURL: "https://bd-eregistry.dhis2.org/dhis/",
});

export default instance;