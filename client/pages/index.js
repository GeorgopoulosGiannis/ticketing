import axios from 'axios';


const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async () => {
  //const response = await axios.get('http://auth-srv:3000/api/users/currentuser');
  const response = await axios.get('http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser')
  return response.data;
};

export default LandingPage;